import React, { Component } from 'react';
import styles from '../stylesheets/TrackResults.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class TrackResults extends Component {

  addToPlaylist = (e) => {
    const addToPlaylist = async () => {
      try {

        const data = await axios({
          method: 'post', //you can set what request you want to be
          url: 'http://localhost3001/add-song',
          data: {
            user_id: this.props.user_id,
            title: e.target.value[0],
            uri: e.target.value[2],
            artist: e.target.value[1],
          },
          headers: {}
        })
        this.setState({ featured: data.data }, () => this.props.passDataUp(this.state.featured))
      } catch (error) {
        console.error(error.message)
      }
    } 
    addToPlaylist();
  }


  render() {
    console.log(this.props.user_id);
    let topSongTracks = this.props?.topTracks?.tracks?.items?.map(item => {
      return (
        <tr className={styles['tr-trackdata']} key={item.id}>
          <td>
            <div>{item.name}</div>
            <div>{item?.artists[0]?.name}</div>
          </td>
          <td>
            {item?.album?.name}
          </td>
          <td>
            <div className={styles['button-wrapper']}>
              <div className={styles['button-parent']}>
                <button value={[item.name, item?.artists[0]?.name, item]} onClick={this.addToPlaylist}></button>
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          </td>
        </tr>
      )
    });
    return (
      <tbody className={styles['tbody-trackdata']}>{topSongTracks}</tbody>
    )
  }
}
