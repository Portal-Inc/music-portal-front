import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios'
import styles from '../stylesheets/MusicPortal.module.css'

export default class Portalsearch extends Component {
  constructor() {
    super()
    this.state = {


      artistData: '',
      artist: '',
      genre: '',
      dnce: 0.5,
      mapData: '',
      run: true,
      songs: [],
      vibe: 0.5,
      loud: 0.5,
      energy: 0.5,


    }
  }

  handleArt = (dataObj) => {

    let artMap = dataObj?.artists?.items[0]?.id

    this.setState({ mapData: artMap })

  }

  getData = async (e) => {
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
      setTimeout(this.getRec, 500)
    }
    catch (error) {
      console(error)
    }
  }

  handleArtist = (e) => {
    e.preventDefault();

    this.setState({
      artist: e.target.value,
    })

  }

  handleGenre = (f) => {
    f.preventDefault();
    this.setState({
      genre: f.target.value,
    })

  }




  componentDidMount() {
    this.setState({ token: this.props.token })

  }

  getRec = async () => {

    let id = this.state.mapData;
    let genre = this.state.genre;
    let dnce = this.state.dnce;
    let vibe = this.state.vibe;
    let loud = this.state.loud;
    let energy = this.state.energy;

    try {
      console.log(id)
      let songArr = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/recommendations?limit=9&seed_artists=${id}&seed_genres=${genre}&target_danceability=${dnce}&target_energy=${energy}&target_loudness=${loud}&target_valence=${vibe}`,
        data: {},
        headers: {
          'accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        }

      })
      this.props.handleRec(songArr.data)
      this.setState({ songs: songArr.data })

    } catch (error) {
      console.log(error.message)
    }
  }






  render() {


    return (
      <>
        <h1 className={styles['header']}> Custom Recommendations</h1>
        <Form onSubmit={this.getData}>

          <Form.Group className={`${styles['forms']} mb-3`} controlId="formArtist">
            <Form.Label className={styles['textHigh']}>Pick a Artist/Band </Form.Label>
            <Form.Control onInput={this.handleArtist} type="text" className={styles['text']} placeholder="Enter Artist / Band Name" />
            <Form.Text className="text-muted">

            </Form.Text>
          </Form.Group>

          <Form.Group className={`${styles['forms']} mb-3`} controlId="formGenre">
            <Form.Label className={styles['textHigh']}>Pick a Genre</Form.Label>
            <Form.Control onInput={this.handleGenre} type="text" className={styles['text']} placeholder="Enter a Genre" />
            <Form.Text className="text-muted">

            </Form.Text>
          </Form.Group>
          <h2 className={styles['textHigh']}>Choose your attributes!</h2>

          <section className={styles['drop']}>

            <Dropdown>
              <Dropdown.Toggle className={styles['text']} variant="success" id="dropdown-basic">
                Dancy?
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles['text']}>
                <Dropdown.Item onClick={() => this.setState({ dnce: 0.8 })} href="#sel-1">Yes</Dropdown.Item>
                <Dropdown.Item onClick={() => this.setState({ dnce: 0.2 })} href="#sel-2">No</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle className={styles['text']} variant="success" id="dropdown-basic">
                Vibe?
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles['text']}>
                <Dropdown.Item onClick={() => this.setState({ vibe: 0.8 })} href="#sel-1">Happy/Euphoric</Dropdown.Item>
                <Dropdown.Item onClick={() => this.setState({ vibe: 0.2 })} href="#sel-2">Sad/Angry</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle className={styles['text']} variant="success" id="dropdown-basic">
                Loud?
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles['text']}>
                <Dropdown.Item onClick={() => this.setState({ loud: 0.8 })} href="#sel-1">Yes</Dropdown.Item>
                <Dropdown.Item onClick={() => this.setState({ loud: 0.2 })} href="#sel-2">No</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle className={styles['text']} variant="success" id="dropdown-basic">
                Energy?
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles['text']}>
                <Dropdown.Item onClick={() => this.setState({ energy: 0.8 })} href="#sel-1">More</Dropdown.Item>
                <Dropdown.Item onClick={() => this.setState({ energy: 0.2 })} href="#sel-2">Less</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="primary" className={styles['text']} type="submit">
              Get Results!
            </Button>
          </section>


          <Form.Group className="mb-3" ></Form.Group>
        </Form>
      </>
    )
  }
}
