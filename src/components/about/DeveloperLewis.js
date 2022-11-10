import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LewisModal from './LewisModalNew'

export default class DeveloperLewis extends Component {
  

  render() {
    console.log('lewis ran');
    return (
      <>
    
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Lewis</Card.Title>
          <Button  onClick = {this.props.open} variant="primary">About</Button>
        </Card.Body>
      </Card>
      <LewisModal show={this.props.show} hide={this.props.hide}/>
         </>
    )
  }
}

