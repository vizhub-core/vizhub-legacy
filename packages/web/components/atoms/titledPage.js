import React from 'react';
import Head from 'next/head';

export const TitledPage = ({title, children}) => {
  if (!title) {
    throw new Error('The "title" prop is required for TitledPage.');
  }
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </React.Fragment>
  );
};
