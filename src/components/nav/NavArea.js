import React, { Component } from 'react'
import styles from '../stylesheets/NavArea.module.css'
import '../stylesheets/drawer.css'

import axios from 'axios'
export default class NavArea extends Component {

  constructor() {
    super()
    this.state = {

      profileName: '',
      profilePic: '',

    }
  }
  getData = async () => {
    await axios({
      method: 'get', //you can set what request you want to be
      url: 'https://api.spotify.com/v1/me',
      data: {},
      headers: {
        'Authorization': 'Bearer ' + this.state.token,
        'accept': 'application/json',
        'Content-type': 'application/json',
      }
    })
      .then(data => this.setState({

        profileName: data.data.display_name,
        profilePic: data.data.images[0].url
      }))
      .catch(error => console.log(error))

  }
  componentDidMount() {
    this.setState({ token: this.props.token })

  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.token !== prevState.token) {
      if (this.state.token) {
        this.getData()
      }


    }
  }

  render() {

    return (
      <section className={styles.nav}>
          <img className={styles.nav__logo} src= '.src./img/logo1.png' alt='logo' />

        <figure className={styles['nav__profile-pic']}>
          <img className={styles['nav__profile-pic--img']} src={this.state.profilePic} alt='' />
        </figure>
        <figure>
        </figure>
      </section>
    )
  }
}
