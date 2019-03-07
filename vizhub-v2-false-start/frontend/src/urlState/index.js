import React from 'react';
import { withRouter } from 'react-router';
import {
  getShowConfigurator,
  setShowConfigurator,
  getFile,
  setFile
} from './accessors';

export const withURLState = Component =>
  withRouter(props => {
    const urlState = {
      showConfigurator: getShowConfigurator(props),
      setShowConfigurator: value => setShowConfigurator(props, value),
      file: getFile(props),
      setFile: value => setFile(props, value)
    };
    return <Component urlState={urlState} />;
  });
