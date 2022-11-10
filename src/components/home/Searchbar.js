import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import ArtistResults from './ArtistResults';
import TrackResults from './TrackResults ';
import styles from '../stylesheets/TrackResults.module.css';
import axios from 'axios';


export default class Searchbar extends Component {
  constructor() {
    super()
    this.state = {
      artistData: '',
      artist: '',
      songData: '',
      trackData: '',
      mapData: '',
      run: true,
      songs: [],
    }
  }

  handleArt = (dataObj) => {
    let artMap = dataObj?.artists?.items[0]?.id
    this.setState({ mapData: artMap })
  }

  getDataSong = async (e) => {
    e.preventDefault();
    try {
      let song = this.state.songData;
      let data = await axios({
        method: 'get', //you can set what request you want to be
        url: `https://api.spotify.com/v1/search?q=${song}&type=track&market=US&limit=3`,
        data: {},
        headers: {
          'accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        }
      })
      console.log(data.data)
      this.setState({ trackData: data.data })
    }
    catch (error) {
      console(error.message)
    }
  }

  getDataArtists = async (e) => {
    e.preventDefault();
    try {
      let artist = this.state.artist;
      let data = await axios({
        method: 'get', //you can set what request you want to be
        url: `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`,
        data: {},
        headers: {
          'accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        }
      })
      console.log(data.data)
      this.handleArt(data.data)
      this.setState({ artistData: data.data })
      setTimeout(this.getRec, 1500)
    }
    catch (error) {
      console(error.message)
    }
  }


  handleArtist = (e) => {
    e.preventDefault();
    this.setState({
      artist: e.target.value,
    })
  }

  handleSong = (f) => {
    f.preventDefault();
    this.setState({
      songData: f.target.value,
    })
  }

  componentDidMount() {
    this.setState({ token: this.props.token })
  }

  getRec = async () => {
    let id = this.state.mapData;
    try {
      console.log(id)
      let songArr = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
        data: {},
        headers: {
          'accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        }
      })
      // this.props.handleRec(songArr.data)
      this.setState({ songs: songArr.data })
    } catch (error) {
      console.log(error.message)
    }
  }
  render() {
    console.log(this.state.trackData);
    return (
      <>


        <Form onSubmit={this.getDataSong}>
          <Form.Group className="mb-3" controlId="songInfo">
            <Form.Label>Search for a song. </Form.Label>
            <Form.Control
              onInput={this.handleSong} type="input" placeholder="Enter Song Name" />
            <Form.Text className="text-muted">
              Powered by Spotify ©
            </Form.Text>
            <Form.Group className="mb-3" ></Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          </Form.Group>
        </Form>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Top 3 Song Results</Accordion.Header>
            <Accordion.Body>
            <table className={styles['table-trackdata']}>
            <thead className={styles['thead-trackdata']}>
              <tr>
                <th>Title</th>
                <th>Album</th>
                <th>Add to Playlist</th>
              </tr>
            </thead>
              <TrackResults topTracks={this.state.trackData} user_id={this.props.user_id}/>
            </table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Form onSubmit={this.getDataArtists}>
          <Form.Group className="mb-3" controlId="atistInfo">
            <Form.Label>Artist / Band Name</Form.Label>
            <Form.Control onInput={this.handleArtist} type="input" placeholder="Enter Artist / Band Name" />
            <Form.Text className="text-muted">
              Powered by Spotify ©
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Form.Group className="mb-3" ></Form.Group>
        </Form>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Top 10 Tracks from Artist</Accordion.Header>
            <Accordion.Body>
              <ArtistResults artistTopTracks={this.state.songs} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    );
  }
};