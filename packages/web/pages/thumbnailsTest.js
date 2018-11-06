import React from 'react';
import Page from '../components/page';
import { TitledPage } from '../components/atoms/titledPage';
import { getJSON } from '../utils/getJSON';

export default class extends Page {
  static async getInitialProps({req}) {
    const props = await super.getInitialProps({ req });
    console.log(props);
    props.metadata = await getJSON(`/api/visualization/metadata`, req);;
    return props;
  }
  render() {
    return (
      <TitledPage title='Thumbnails Test Page'>
        <pre>{JSON.stringify(this.props.metadata)}</pre>
      </TitledPage>
    );
  }
}
