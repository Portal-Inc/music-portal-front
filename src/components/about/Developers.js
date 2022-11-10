import { Component } from 'react';
import DeveloperLewis from './DeveloperLewis';
import DeveloperSteven from './DeveloperSteven';
import DeveloperTrace from './DeveloperTrace';
import DeveloperZoe from './DeveloperZoe';
import styles from '../stylesheets/About.module.css';


export default class Developers extends Component {
  render() {
    return (
      <>
      <div className={styles['dev-row-1']}>
        <DeveloperLewis open={this.props.open} show={this.props.show} hide={this.props.hide}/>
        <DeveloperSteven open={this.props.open} show={this.props.show} hide={this.props.hide}/>
        </div>
        <div className={styles['dev-row-2']}>
        <DeveloperTrace open={this.props.open} show={this.props.show} hide={this.props.hide}/>
        <DeveloperZoe open={this.props.open} show={this.props.show} hide={this.props.hide}/>
        </div>
      </>
    )
  }
}

