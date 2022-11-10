import React, { Component } from 'react'
import HeroTagLine from './HeroTagLine'
import Customtrack from './Customtrack.js'
import styles from '../stylesheets/Home.module.css'
import Playlist from './Playlist'
import Searchbar from './Searchbar'
import axios from 'axios'
import DailyHomeCard from './DailyHomeCard'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      lyricsData: []

    }
  

  }

  retrieveDailySongs = (dailySongs) => {
    this.setState({ dailySongs: dailySongs })
  }

  getCurrentlyPlaying = async () => {
    try {
      const data = await axios({
        method: 'get', //you can set what request you want to be
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        data: {},
        headers: {
          'Authorization': 'Bearer ' + this.props.token,
          'accept': 'application/json',
          'Content-type': 'application/json',
        }
      })
      this.setState({ artist: data.data.item.artists[0].name, track: data.data.item.name })
    } catch (error) {
      console.error(error.message)
      this.setState({ deviceData: 'error' })
    }
  }


  getLyrics = async () => {
    const url = `http://localhost:3001/lyrics?artist=${this.state.artist}&track=${this.state.track}`
    const result = await axios({
      method: 'get', //you can set what request you want to be
      url: url,
      // data: {},
      // headers: {
      //   'Access-Control-Allow-Origin': '*'
      // }
    })
    try {
      this.setState({
        lyricsData: result.data
      }, this.callAPI)
    } catch (error) {
      console.error(error.message);
    
    }
  }
  componentDidMount() {

    this.setState({
      lyricsData: []
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.playingStatus) {
      setTimeout(this.getLyrics, 1500);
    }

  }

  render() {

    window.history.pushState({}, null, '/') // clear the browser URL of text 
    return (
      <main className={styles['wrapper']}>
        {!this.state.dailySongs ? <DailyHomeCard passDataUp={this.retrieveDailySongs} token={this.props.token} /> : null} {/* Helper component for API call */}
        <section className={styles['col-1']}>
          <div className={styles['video']}></div>
          <div className='text-center' style={{ whiteSpace: 'pre' }}>{this.state.lyricsData[0]}</div>
        </section>
        <section className={styles['col-2']}>
          <HeroTagLine />
          <div className={styles['hero__trending']}>TRENDING</div>
          <h2 className={styles['card__heading']}>{this.state.dailySongs?.message}</h2>
          <section className={styles['cards']}>

            {this.state?.dailySongs ? this.state.dailySongs.playlists.items.map(song => {
              return <Playlist currentlyPlaying={this.getCurrentlyPlaying} token={this.props.token} key={song.id} songData={song} />
            }) : null}

          </section>
        </section>
        <section className={styles['col-3']}>
          <div className={styles['search']}> < Searchbar token={this.props.token} user_id={this.props.user_id} /> </div>
          <div className={styles['play-list']}>< Customtrack /></div>
        </section>


      </main>
    )
  }
}
