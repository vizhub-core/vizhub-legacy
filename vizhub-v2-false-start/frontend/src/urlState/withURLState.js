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
      setShowConfigurator: setShowConfigurator(props),
      file: getFile(props),
      setFile: setFile(props)
    };
    return <Component urlState={urlState} {...props} />;
  });
