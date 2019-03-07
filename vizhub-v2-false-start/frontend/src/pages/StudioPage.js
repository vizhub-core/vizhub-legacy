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

const withURLState = Component =>
  withRouter(props => {
    const urlState = {
      getShowConfigurator: () => getShowConfigurator(props),
      setShowConfigurator: value => setShowConfigurator(props, value),
      getFile: () => getFile(props),
      setFile: value => setFile(props, value)
    };
    return <Component urlState={urlState} />;
  });

export const StudioPage = withURLState(({ urlState }) => {
  const [loaded, setLoaded] = useState(false);
  const {
    getShowConfigurator,
    setShowConfigurator,
    getFile,
    setFile
  } = urlState;

  const showConfigurator = getShowConfigurator();

  const file = getFile();
  const showEditor = file !== undefined;

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  const onEditClick = () => setShowConfigurator(!showConfigurator);
  const onConfiguratorClose = () => setShowConfigurator(false);

  const onConfiguratorSectionToggle = sectionId =>
    setShowConfigurator(showConfigurator === sectionId ? true : sectionId);

  const onFileClick = clickedFile =>
    setFile(clickedFile === file ? undefined : clickedFile);

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
