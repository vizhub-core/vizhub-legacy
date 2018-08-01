import React from 'react';
import Router from 'next/router';
import Page from '../../components/page';
import { BodyAuthenticated, BodyNotAuthenticated } from './body';
import { TitledPage } from '../../components/atoms/titledPage';
import { ActionBox } from '../../components/molecules/actionBox';
import { NavBar } from '../../components/organisms/navBar';
import { datasetRoute } from '../../routes/routeGenerators';

export default class extends Page {
  constructor() {
    super();

    this.uploadDataset = async (dataset) => {
      const { csrfToken, user } = this.props;
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
      console.log(response);
      const { error, slug } = response;

      if (error) {
        return setState({ error });
      }

      Router.push(datasetRoute({
        userName: user.userName,
        slug
      }));

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
