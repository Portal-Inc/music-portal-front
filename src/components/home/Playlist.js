import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import styles from '../stylesheets/Song.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

export default class Song extends Component {
  constructor() {
    super()
    this.state = {}
  }

  getCurrentDevice = async () => {
    try {
      const data = await axios({
        method: 'get', //you can set what request you want to be
        url: 'https://api.spotify.com/v1/me/player/devices',
        data: {},
        headers: {
          'Authorization': 'Bearer ' + this.props.token,
          'accept': 'application/json',
          'Content-type': 'application/json',
        }
      })
      const current = data.data.devices.find(device => device.name === 'Spotify Web Player')
      this.setState({ deviceData: current.id })
    } catch (error) {
      console.error(error.message)
      this.setState({ deviceData: 'error' })
    }
  }

  playFromDailyPlaylist = async (uri) => {
    try {
      const data = await axios({
        method: 'put', //you can set what request you want to be
        url: `https://api.spotify.com/v1/me/player/play?device_id=${this.state.deviceData}`,
        data: {
          "context_uri": uri,
          "offset": {
            "position": 5
          },
          "position_ms": 0
        },
        headers: {
          'Authorization': 'Bearer ' + this.props.token,
          'accept': 'application/json',
          'Content-type': 'application/json',
        }
      })
      setTimeout(this.props.currentlyPlaying, 1500)
    } catch (error) {
      console.error(error.message)
    }
  }
  handleClick = (e) => {

    this.getCurrentDevice()
    const waitBeforePlaying = () => {
      this.playFromDailyPlaylist(e.target.value)
    }
    setTimeout(waitBeforePlaying, 1500)

  }


  render() {

    return (
      <React.Fragment>

        <Card className={styles.card} >
          <Card.Img className={styles['card-img']} src={this.props.songData.images[0].url} />
          <Card.Body>
            <Card.Title>
              {this.props.songData.name}
            </Card.Title>
            <div className={styles['card__text-wrapper']}>
              <div className={styles['card__text-content']}>
                <button className={styles['card__text-content--button']} onClick={this.handleClick} value={this.props.songData.uri}></button>
                <Card.Text className={styles['card-text']}>
                  <FontAwesomeIcon icon={faPlay} />

                </Card.Text>
              </div>
            </div>


          </Card.Body>
        </Card>
      </React.Fragment >
    )
  }
}
