import React, { useContext, useCallback } from 'react';
import { NavBar } from '../../../NavBar';
import { ForkingContext } from '../ForkingContext';
import { URLStateContext } from '../URLStateContext';
import { Wrapper, Top, Bottom } from './styles';
import { Head } from './Head';
import { FullScreen } from './FullScreen';
import { Editor } from './Editor';
import { Viewer } from './Viewer';

export const Body = () => {
  const onFork = useContext(ForkingContext);
  const { isFullScreen, setIsFullScreen } = useContext(URLStateContext);

  const onFullScreen = useCallback(() => {
    setIsFullScreen(true);
  }, [setIsFullScreen]);

  const onExitFullScreen = useCallback(() => {
    setIsFullScreen(false);
  }, [setIsFullScreen]);

  return isFullScreen ? (
    <FullScreen onExitFullScreen={onExitFullScreen} />
  ) : (
    <Wrapper>
      <Top>
        <NavBar />
        <Head onFork={onFork} />
      </Top>
      <Bottom>
        <Editor />
        <Viewer onFullScreen={onFullScreen} />
      </Bottom>
    </Wrapper>
  );
};
