import styles from '../stylesheets/SplashPage.module.css'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import videoBg from './assets/Vinyl.mp4'
import logo from './assets/Logo.png'

const CLIENT_ID = '75b90235ba3f4956834f605c46d9d923'
const REDIRECT_URI = 'http://localhost:3000/'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const RESPONSE_TYPE = 'code'
const SCOPE = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-top-read',
  'user-read-currently-playing',
].join('%20')
export default class SplashPage extends Component {




  render() {

    return (
      <>


        <div className={styles['login']}>
          <img className={styles['logo']} src={logo} alt="logo" />
          <div className={styles['overlay']}></div>
          <video className={styles['video']} src={videoBg} autoPlay loop muted />
          <div className={styles['content']}>
            <p>Portal Inc ©</p>
            <p>Welcomes you!</p>
            <p>Powered with Spotify ©</p>
          </div>
          <Button variant="primary" className={styles['button']} href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Link your Spotify</Button>
        </div>
      </>

    )
  }
}
