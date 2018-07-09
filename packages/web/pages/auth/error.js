import React from 'react';
import Link from 'next/link';
import Page from '../../components/page';
import { TitledPage } from '../../components/atoms/titledPage';

export default class extends Page {

  static async getInitialProps({req, query}) {
    let props = await super.getInitialProps({req});
    props.action = query.action || null;
    props.type = query.type || null;
    props.service = query.service || null;
    return props;
  }

  render() {
    return (
      <TitledPage title="Error Signing In">
        <div className="text-center mb-5">
          <h1 className="display-4 mt-5">Error signing in</h1>
          <p className="lead">An error occured while trying to sign in.</p>
        </div>
      </TitledPage>
    );
  }
}
