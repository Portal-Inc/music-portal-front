import React, { Component } from 'react'
import '../stylesheets/drawer.css'
import styles from '../stylesheets/NavDrawer.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class NavDrawer extends Component {
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
        'Content-type': 'application/json'
      }
    })
      .then(data => this.setState({
        userID: data.data.id,
        profileName: data.data.display_name,
        profilePic: data.data.images[0].url
      },() => this.props.getUserId(this.state.userID)
      ))
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
    // console.log(this.state.token)
    return (
      <div className="pure-container" data-effect="pure-effect-slide">
        <input type="checkbox" id="pure-toggle-right" className="pure-toggle" data-toggle="right" />
        <label className="pure-toggle-label" htmlFor="pure-toggle-right" data-toggle-label="right">
          <span className="pure-toggle-icon"></span>
        </label>

        <div className={`pure-drawer ${styles.drawer}`} data-position="right">
          <figure className={styles['nav__profile-pic']}>
            <img className={styles['nav__profile-pic--img']} src={this.state.profilePic} alt='' />
          </figure>
          <ul className={styles.drawer__links}>
            <div className={styles['drawer__links--top']}>
              <li>
                <Link to='/'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/music-portal'>
                  Music Portal
                </Link>
              </li>
              <li>
                <Link to='/about'>
                  About
                </Link>
              </li>
            </div>
            <li>
              <Link to='/logout'>
                Logout
              </Link>
            </li>
          </ul>
        </div >

        <div className="pure-pusher-container">
          <div className="pure-pusher">

          </div>
        </div>
        <label className="pure-overlay" htmlFor="pure-toggle-right" data-overlay="right"></label>
      </div >
    )
  }
}


