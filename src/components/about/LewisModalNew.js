import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import styles from '../stylesheets/Home.module.css'
export default class AboutModal extends Component {



  render() {
    return (
      <>
      <Modal show={this.props.show} onHide={this.props.hide}>
           <Modal.Title>Lewis</Modal.Title>
           <Modal.Body >Your image here</Modal.Body>
           <Modal.Footer>Description Filler</Modal.Footer>
         </Modal>
      </>
    )
  }
}
