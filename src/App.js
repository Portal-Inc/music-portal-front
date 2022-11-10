import React, { Component } from 'react'
import './components/stylesheets/reset.css'
import './components/stylesheets/App.css'
import NavDrawer from './components/nav/NavDrawer';
import NavArea from './components/nav/NavArea'
import Home from './components/home/Home'
import About from './components/about/About'
import MusicPortal from './components/music-portal/MusicPortal'
import SplashPage from './components/splashPage/SplashPage'
import Footer from './components/nav/Footer'
import Auth from './Auth';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './components/stylesheets/music-player.css'
const code = new URLSearchParams(window.location.search).get("code")

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      token: '',
      data: {},
      topData: []
    }
  }

  checkLogin = (token) => {
    this.setState({ token: token })
  }

  getToken = (token) => {
    this.setState({ token: token })
  }

  handleData = (topData) => {
    this.setState({ topData: topData })
  }

  getUserID = (userid) => {
    this.setState({ user_id: userid })
  }
  grabPlayingStatus = (isItPlaying) => {
    this.setState({ currentlyPlaying: isItPlaying }, () => console.log(this.state.currentlyPlaying))
  }



  postUserData = async (obj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/user-results`;

      let dataPost = await axios.post(url, obj);

      this.setState({
        topData: [...this.state.topData, dataPost.data]
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  trackUri = 'spotify:artist:3HkwxR8PuBf5hvumgsfByJ'

  render() {

    return (
      <React.Fragment>
        <NavArea />

          {this.state.token ? <NavDrawer token={this.state.token}  getUserId={this.getUserID}/> : null}

        <Routes>
          <Route path='/' element={
            !code ? <SplashPage checkLogin={this.checkLogin} /> :
              <React.Fragment >

                {!this.state.token ? <Auth onGetToken={this.getToken} code={code} /> : null}
                {this.state.token ? <Home playingStatus={this.state.currentlyPlaying} token={this.state.token} /> : null}
              </React.Fragment>
          } />

          <Route path='/about' element={
            <React.Fragment>
              {this.state.token ? < About /> : null}
            </React.Fragment>
          } />
          <Route path='/music-portal' element={
            <React.Fragment >
              {this.state.token ? <MusicPortal data={this.state.topData} pushData={this.handleData} token={this.state.token} /> : null}

            </React.Fragment>
          } />

          <Route path='/logout' element={
            <React.Fragment>

              < SplashPage />
            </React.Fragment>
          } />
        </Routes>
        {this.state.token ? <Footer playingStatus={this.grabPlayingStatus} trackUri={this.trackUri} token={this.state.token} /> : null}
      </React.Fragment>
    )
  }
}
