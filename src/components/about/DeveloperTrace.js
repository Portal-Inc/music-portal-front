import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import pic from './AboutAssests/Trace.jpg';
import styles from '../stylesheets/About.module.css';

export default class DeveloperTrace extends Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" className={styles['img']} src={pic}/>
        <Card.Body>
          <Card.Title>Trace</Card.Title>
          <Button variant="success">About</Button>
        </Card.Body>
      </Card>
    )
  }
}
