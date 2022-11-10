import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import styles from '../stylesheets/About.module.css';


export default class MissionStatment extends Component {
  render() {
    return (
      <Alert variant='success' className={styles['mission-alert']}>
        About Portal, The Company.
      </Alert>
    )
  }
};

