import React from 'react';
import { useState, useEffect } from 'react';
import { LoadingScreen } from '../LoadingScreen';
import { Studio } from '../Studio';
import { withURLState, URLStateProvider } from '../urlState';

export const StudioPage = withURLState(({ urlState }) => {
  const [loaded, setLoaded] = useState(false);
  const { showConfigurator, setShowConfigurator, file, setFile } = urlState;

  const showEditor = file !== undefined;

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  const onEditClick = () => setShowConfigurator(!showConfigurator);

  const onFileClick = clickedFile =>
    setFile(clickedFile === file ? undefined : clickedFile);

  return loaded ? (
    <URLStateProvider>
      <Studio
        showConfigurator={showConfigurator}
        showEditor={showEditor}
        onEditClick={onEditClick}
        onFileClick={onFileClick}
      />
    </URLStateProvider>
  ) : (
    <LoadingScreen />
  );
});
