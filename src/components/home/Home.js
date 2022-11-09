import React, { Component } from 'react'
import HeroTagLine from './HeroTagLine'
import Customtrack from './Customtrack.js'
import styles from '../stylesheets/Home.module.css'
import Song from './Song'
import Searchbar from './Searchbar'
import axios from 'axios'


const artist = 'Grayscale';

const track = 'Over%20Now';

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      lyricsData: []

    }
  

  }
  retrieveDailySongs = (dailySongs) => {
    this.setState({ dailySongs: dailySongs }, () => console.log(this.state.dailySongs))
  }

  getlyrics = async () => {
    let result = await axios({
      method: 'get', //you can set what request you want to be
      url: `http://localhost:3001/lyrics?artist=Grayscale&track=Over%20Now`,
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
  
    componentDidMount(){
      this.setState({
        lyricsData: []
      });
    }

    componentDidUpdate(){
      if (!this.state.lyricsData.length) {
        this.getlyrics();
      }

      console.log(this.state);
    }
  



  render() {


    window.history.pushState({}, null, '/') // clear the browser URL of text 
    return (
      <main className={styles['wrapper']}>
        <section className={styles['col-1']}>
          <div className={styles['video']}></div>
          <div className='text-center' style={{ whiteSpace: 'pre' }}>{this.state.lyricsData[0]}</div>
        </section>
        <section className={styles['col-2']}>
          <HeroTagLine />
          <div className={styles['hero__trending']}>TRENDING</div>
          <h3>{this.state.dailySongs?.message}</h3>
          <section className={styles['cards']}>



            {/* <div className={styles['card']}>
             
            </div> */}
            <Song passDataUp={this.retrieveDailySongs} token={this.props.token} />
          </section>
        </section>
        <section className={styles['col-3']}>
          <div className={styles['search']}> < Searchbar /> </div>
          <div className={styles['play-list']}>< Customtrack /></div>
        </section>


      </main>
    )
  }
}
