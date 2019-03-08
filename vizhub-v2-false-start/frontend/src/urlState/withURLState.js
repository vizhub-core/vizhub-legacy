import React from 'react';
import { withRouter } from 'react-router';
import { accessors } from './accessors';

// Higher order component exposing URL state accessors.
export const withURLState = Component =>
  withRouter(props => {
    // Raw accessor functions for URL parameter state.
    const { edit, setEdit, file, setFile } = accessors(props);

    // True if configurator should be shown with no active sections.
    // The active section id string if a section is active.
    // False if the configurator should not be shown at all.
    const showConfigurator =
      edit === undefined ? false : edit === null ? true : edit;

    // Accepts a boolean value or section id string.
    const setShowConfigurator = value =>
      setEdit(typeof value === 'boolean' ? (value ? null : undefined) : value);

    // Derived accessors for URL state, exposed to components.
    const urlState = {
      file,
      selectFile: value => () => setFile(value === file ? undefined : value),
      showConfigurator,
      setShowConfigurator,
      toggleConfigurator: () => setShowConfigurator(!showConfigurator),
      hideConfigurator: () => setShowConfigurator(false)
    };

    // Expose accessors to wrapped component as urlState prop.
    return <Component urlState={urlState} {...props} />;
  });
