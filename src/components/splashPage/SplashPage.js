import styles from '../stylesheets/SplashPage.module.css'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import videoBg from './assets/Vinyl.mp4'
import spotify from './assets/Spot.png'


const CLIENT_ID = '75b90235ba3f4956834f605c46d9d923'
const REDIRECT_URI = process.env.REACT_APP_FRONT
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

          <div className={styles['overlay']}></div>
          <video className={styles['video']} src={videoBg} autoPlay loop muted />
          <div className={styles['content']}>
            <p>Portal Inc ©</p>

            <h3>Find Solace in Music...Embrace Harmony...</h3>
          </div>
          <Button variant="primary" className={styles['button']} href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Sign in with Spotify<img alt='spotify logo' src={spotify} /></Button>
        </div>
      </>

    )
  }
}
