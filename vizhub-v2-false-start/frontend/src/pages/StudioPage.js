import React from 'react';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { LoadingScreen } from '../LoadingScreen';
import { Studio } from '../Studio';
import {
  getShowConfigurator,
  setShowConfigurator,
  getFile,
  setFile
} from '../urlState';

export const StudioPage = withRouter(props => {
  const [loaded, setLoaded] = useState(false);

  const showConfigurator = getShowConfigurator(props);

  const file = getFile(props);
  const showEditor = file !== undefined;

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  const onEditClick = () => setShowConfigurator(props, !showConfigurator);
  const onConfiguratorClose = () => setShowConfigurator(props, false);

  const onConfiguratorSectionToggle = sectionId =>
    setShowConfigurator(
      props,
      showConfigurator == sectionId ? true : sectionId
    );

  const onFileClick = clickedFile =>
    setFile(props, clickedFile === file ? undefined : clickedFile);

  return loaded ? (
    <Studio
      showConfigurator={showConfigurator}
      onConfiguratorClose={onConfiguratorClose}
      onConfiguratorSectionToggle={onConfiguratorSectionToggle}
      showEditor={showEditor}
      onEditClick={onEditClick}
      onFileClick={onFileClick}
    />
  ) : (
    <LoadingScreen />
  );
});
