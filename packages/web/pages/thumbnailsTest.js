import React from 'react';
import Page from '../components/page';
import { TitledPage } from '../components/atoms/titledPage';
import { getJSON } from '../utils/getJSON';

const thumbnailUrl = id => `/api/visualization/thumbnail/${id}.png`;

export default class extends Page {
  static async getInitialProps({req}) {
    const props = await super.getInitialProps({ req });
    props.metadata = await getJSON(`/api/visualization/metadata`, req);;
    return props;
  }
  render() {
    return (
      <TitledPage title='Thumbnails Test Page'>
      {
        this.props.metadata.map(info => (
          <img key={info.id} src={thumbnailUrl(info.id)}/>
        ))
      }
      </TitledPage>
    );
  }
}
