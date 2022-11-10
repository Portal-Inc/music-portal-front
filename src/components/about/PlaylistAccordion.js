import React, { Component } from 'react';
import styles from '../stylesheets/About.module.css'
import Accordion from 'react-bootstrap/Accordion';


export default class AboutBlank extends Component {
  render() {
    return (
      <div className={styles['playlist-accordion']}>
        <Accordion variant='success'>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Lewis Playlist</Accordion.Header>
            <Accordion.Body>
              Playlist goes here
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Steven Playlist</Accordion.Header>
            <Accordion.Body>
              Playlist goes here
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Trace Playlist</Accordion.Header>
            <Accordion.Body>
              Playlist goes here
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Zoe Playlist</Accordion.Header>
            <Accordion.Body>
              Playlist goes here
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        );
      </div>
    )
  };
}
