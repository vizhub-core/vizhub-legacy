import React from 'react';
import Router from 'next/router';
import Page from '../../components/page';
import { BodyAuthenticated, BodyNotAuthenticated } from './body';
import { visualizationRoute } from '../../routes/routeGenerators';
import { TitledPage } from '../../components/atoms/titledPage';
import { ActionBox } from '../../components/molecules/actionBox';
import { NavBar } from '../../components/organisms/navBar';
import { getJSON } from '../../utils/getJSON';

export default class extends Page {
  static async getInitialProps({req}) {
    const props = await super.getInitialProps({ req });

    const url = 'https://vizhub.com/api/visualization/metadata';
    const metadata = await (await fetch(url)).json();

    //const metadata = await getJSON(`/api/visualization/metadata`, req);;

    props.templates = metadata.filter(info => info.id === 'dd44f8fcdc8346ff90bddd63572bf638');
    
    return props;
  }
  constructor() {
    super();

    this.createVisualizationFromScratch = (
      this.createVisualizationFromScratch.bind(this)
    );
  }

  createVisualizationFromScratch() {
    fetch('/api/visualization/create', { credentials: 'include' })
      .then(r => r.json())
      .then(({id, error}) => {
        if (error) {
          console.log(error);
        } else {
          const userName = this.props.user.userName;
          Router.push(visualizationRoute({id, userName}));
        }
      });
  }

  render() {
    return (
      <TitledPage title='Create Visualization'>
        <NavBar
          user={this.props.user}
          csrfToken={this.props.csrfToken}
        />
        <ActionBox title='Create a Visualization'>
          {
            this.props.user
              ? (
                <BodyAuthenticated
                  templates={this.props.templates}
                  onFromScratchClick={this.createVisualizationFromScratch}
                />
              )
              : <BodyNotAuthenticated />
          }
        </ActionBox>
      </TitledPage>
    );
  }
}
