import React, { Component } from 'react'

import RecSingle from './RecSingle';


export default class Song extends Component {
  render() {
    console.log(this.props.songData)
    let songs = this.props.songData.map(item => {

      return   <RecSingle ArtistName={item.artists[0].name} SongName={item.name} AlbumName={item.album.name} img={item.album.images[0].url}/> 
    })
    return (

<div>{songs}</div>
    )
  }
}
