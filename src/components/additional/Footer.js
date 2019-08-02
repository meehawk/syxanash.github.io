import React, { Component } from 'react';
import {
  Button, Anchor, Cutout,
} from 'react95';

import './Footer.css';

import lastUpdatedFile from '../../resources/last-updated.json';
import clockIcon from '../../resources/icons/clock.png';
import codeIcon from '../../resources/icons/code.png';

class Footer extends Component {
  state = {
    lastUpdated: lastUpdatedFile,
  }

  renderLastCommitButton() {
    const { lastUpdated } = this.state;
    const date = new Date(lastUpdated.date);
    const currentYear = new Date().getFullYear();
    const repositoryYear = date.getFullYear();

    const displayDate = `${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })} ${currentYear !== repositoryYear ? repositoryYear : ''}`;

    return (
      <Anchor
        href='https://github.com/syxanash/simonecomputer'
        target='_blank'
        style={ { color: '#000000', textDecoration: 'none' } }
      >
        <Button fullWidth>
          <img src={ clockIcon } className="small_icon" alt="clock"/>
          <figcaption>Last edited {displayDate}</figcaption>
        </Button>
      </Anchor>
    );
  }

  render() {
    const { active, onClick } = this.props;

    return (
      <Cutout className='footer_cut_out'>
        <div className='footer_buttons' style={ { float: 'left' } }>
          <Button fullWidth active={ active } onClick={ onClick }>
            <img src={ codeIcon } className='small_icon' alt="code"/>
            <figcaption>Info about this website</figcaption>
          </Button>
        </div>
        <div className='footer_buttons' style={ { float: 'right' } }>
          {this.renderLastCommitButton()}
        </div>
      </Cutout>
    );
  }
}

export default Footer;