import React, { Component } from 'react'
import styles from '../stylesheets/TrackResults.module.css';

export default class ArtistResults extends Component {
  render() {
    console.log(this.props.artistTopTracks);
    let topTracks = this.props?.artistTopTracks?.tracks?.map(item => {
      return (
        /* The styling for this lives within 
        src > components > */
        <div className={styles['artist-results']}>{item.name}</div> 
      )
  });
  return(
      <div>{topTracks}</div >
    )
  }
}
