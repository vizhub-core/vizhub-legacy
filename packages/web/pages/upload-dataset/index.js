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

    this.uploadDataset = async (dataset) => {
      const { csrfToken } = this.props;
      const { name, file } = dataset;

      // TODO rename name to title elsewhere.
      const title = name;

      const url = `/api/dataset/create`;
      const options = {
        credentials: 'include',
        method: 'POST',
        headers: {
          'x-csrf-token': csrfToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          file
        })
      };
      const response = await (await fetch(url, options)).json();
      console.log({response});
      // Router.push(dataset({id, userName}));

      // return response.error
      //   ? saveError(response.error)
      //   : saveSuccess();
    };
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
              ? <BodyAuthenticated
                  onUploadDataset={this.uploadDataset}
                  userName={this.props.user.userName}
                />
              : <BodyNotAuthenticated />
          }
        </ActionBox>
      </TitledPage>
    );
  }
}
