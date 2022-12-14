import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios'
import styles from '../stylesheets/MusicPortal.module.css'



export default class Usertop25 extends Component {
  constructor() {
    super()
    this.state = {

      UserTop: '',
      type: '',
      timeRange: '',


    }
    // console.log(UserTop)
  }

  getData = async (e) => {
    e.preventDefault();
    let type = this.state.type
    let timeRange = this.state.timeRange;
    await axios({
      method: 'get', //you can set what request you want to be
      url: `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=25`,
      data: {},
      headers: {
        'Authorization': 'Bearer ' + this.state.token,
        'accept': 'application/json',
        'Content-type': 'application/json',
      }
    })
      .then(data => this.setState({
        UserTop: data.data
      },
        () => {
          this.props.handleData(this.state.UserTop)
        }))

      .catch(error => console.log(error))

  }
  componentDidMount() {
    this.setState({ token: this.props.token })

  }

  // componentDidUpdate(prevProps, prevState) {

  //   if (prevProps.token !== prevState.token) {
  //     if (this.state.token) {

  //     }


  //   }
  // }

  render() {

    return (
      <React.Fragment>
        <Form onSubmit={this.getData} className={styles['left']}>
        <h1 className={styles['head']}>Find your top tracks and artists!</h1>
          <section className={styles['drop']}>
            <Form.Group className="mb-3" controlId="Type">
              <Dropdown>
                <Dropdown.Toggle className={styles['text']} variant="success" id="dropdown-basic">
                  Type
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles['text']}>
                  <Dropdown.Item onClick={() => this.setState({ type: 'artists' })} href="#sel-1">Artists</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({ type: 'tracks' })} href="#sel-2">Tracks</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </Form.Group>

            <Form.Group className="mb-3" controlId="TimeRange">

              <Dropdown >
                < Dropdown.Toggle className={styles['text']} variant="success" id="dropdown-basic">
                  Time Range
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles['text']} >
                  <Dropdown.Item onClick={() => this.setState({ timeRange: 'short_term' })} href="#sel-1">Past Month</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({ timeRange: 'medium_term' })} href="#sel-2">Past 6 Months</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({ timeRange: 'long_term' })} href="#sel-3">Past 3 Years</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

          <Button className={styles['text']} variant="primary" type="submit">
            Get Results!
          </Button>
          </section>
          <Form.Group className="mb-3" ></Form.Group>
        </Form>
      </React.Fragment >
    )
  }
}
