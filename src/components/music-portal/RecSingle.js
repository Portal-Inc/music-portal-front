import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';

export default class RecSingle extends Component {
  render() {
    return (
      <Card >
        <Card.Img src={this.props.img} />
        <Card.Body>
          <Card.Title>
            {this.props.SongName}
          </Card.Title>
          <Card.Text> 
            {this.props.ArtistName}
            <div></div>
            {this.props.AlbumName}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}
