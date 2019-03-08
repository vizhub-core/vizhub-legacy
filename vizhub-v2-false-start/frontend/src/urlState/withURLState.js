import React from 'react';
import { withRouter } from 'react-router';
import { accessors } from './accessors';

export const withURLState = Component =>
  withRouter(props => {
    const { edit, setEdit, file, setFile } = accessors(props);

    // Returns true if configurator should be shown with no active sections.
    // Returns the active section id string if a section is active.
    // Returns false if the configurator should not be shown at all.
    const showConfigurator =
      edit === undefined ? false : edit === null ? true : edit;

    // Accepts a boolean value or section id string.
    const setShowConfigurator = value =>
      setEdit(typeof value === 'boolean' ? (value ? null : undefined) : value);

    const urlState = {
      file,
      setFile,
      showConfigurator,
      setShowConfigurator
    };

    return <Component urlState={urlState} {...props} />;
  });
