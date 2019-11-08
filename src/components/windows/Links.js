import React, { Component } from 'react';
import {
  Button, Cutout, Fieldset,
} from 'react95';
import _ from 'lodash';

import 'animate.css';

import linksIcon from '../../resources/icons/links.gif';
import spinningGlobe from '../../resources/images/globe.gif';

import './Links.css';
import websiteLinks from '../../resources/website-links.json';

class LinksHeader extends Component {
  render = () => (
    <span>
      <img src={ linksIcon } alt='Links' style={ { height: '15px' } }/> Links
    </span>
  )
}

class LinksBody extends Component {
  state = {
    linksObject: websiteLinks,
    activeTab: 0,
  }

  openRandomLink = () => {
    const { linksObject } = this.state;

    const linksList = _.flatten(linksObject.map(linkItem => linkItem.links));

    const randomLink = Object.keys(linksList).map(e => linksList[e])[
      Math.floor(Math.random() * Object.keys(linksList).map(e => linksList[e]).length)
    ];

    window.open(randomLink.url, '_blank');
  }

  handleChangeTab = value => this.setState({ activeTab: value });

  generateTabs = () => {
    const { linksObject, activeTab } = this.state;

    const tabsComponent = linksObject
      .map((linkItem, index) => (<Button
        style={ { margin: '5px', marginRight: '10px' } }
        key={ `tab_${index}` }
        active={ index === activeTab }
        onClick={ () => {
          this.handleChangeTab(index);
        } }>
        {linkItem.section}
      </Button>));

    return (<div style={ { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' } }>
      {tabsComponent}
      <Button style={ { margin: '5px', marginRight: '10px' } } className='animated tada delay-1s' onClick={ this.openRandomLink }><b>Open a random website</b></Button>
    </div>);
  }

  generateTabBody = () => {
    const { linksObject, activeTab } = this.state;

    const linksList = linksObject[activeTab].links;

    const LinksListComponent = <ul>{linksList.map((link, index) => {
      const descriptionContent = link.description
        ? <span style={ { fontWeight: 'bold' } } dangerouslySetInnerHTML={ { __html: `(${link.description})` } }></span>
        : '';

      return (<li className='link-style' key={ `${link.url}_${index}` }>
        <a href={ link.url } target='_blank' rel='noopener noreferrer'>{ link.url }</a> { descriptionContent }
      </li>);
    })}</ul>;

    return (
      <Cutout>
        <div className='link-list'>{LinksListComponent}</div>
      </Cutout>
    );
  }

  render = () => (<div style={ { marginTop: '-10px' } }>
    <Cutout className='globe-container'><img src={ spinningGlobe } alt='spinning globe' className='globe-picture' /></Cutout>
    <Fieldset>
      This is my <b>Linklog</b> with links to articles, cool websites and people's
      personal pages that I found inspiring or somehow creative.
      If you see a dead link feel free to open a pull request!
    </Fieldset>
    <div style={ { paddingBottom: '15px', paddingTop: '10px', textAlign: 'center' } }>
      {this.generateTabs()}
    </div>
    <div>
      {this.generateTabBody()}
    </div>
  </div>);
}

export { LinksHeader, LinksBody };
