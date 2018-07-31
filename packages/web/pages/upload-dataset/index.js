import React from 'react';
import Router from 'next/router';
import Page from '../../components/page';
import { BodyAuthenticated, BodyNotAuthenticated } from './body';
import { edit } from '../../routes';
import { TitledPage } from '../../components/atoms/titledPage';
import { ActionBox } from '../../components/molecules/actionBox';
import { NavBar } from '../../components/organisms/navBar';

export default class extends Page {
  constructor() {
    super();

    this.uploadDataset = (
      this.uploadDataset.bind(this)
    );
  }

  uploadDataset() {
    fetch('/api/dataset/create', { credentials: 'include' })
      .then(r => r.json())
      .then(({id, error}) => {
        if (error) {
          console.log(error);
        } else {
          const userName = this.props.user.userName;
          Router.push(edit({id, userName}));
        }
      });
  }

  render() {
    return (
      <TitledPage title='Upload Dataset'>
        <NavBar
          user={this.props.user}
          csrfToken={this.props.csrfToken}
        />
        <ActionBox title='Upload a Dataset'>
          {
            this.props.user
              ? <BodyAuthenticated onUploadDataset={this.uploadDataset} />
              : <BodyNotAuthenticated />
          }
        </ActionBox>
      </TitledPage>
    );
  }
}
