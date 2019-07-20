import React, { useContext, useState, useCallback } from 'react';
import { NavBar } from '../../../NavBar';
import { URLStateContext } from '../URLStateContext';
import { ForkingContext } from '../ForkingContext';
import { Wrapper, Top, Bottom } from './styles';
import { Head } from './Head';
import { FullScreen } from './FullScreen';
import { Editor } from './Editor';
import { Viewer } from './Viewer';

export const Body = () => {
  const onFork = useContext(ForkingContext);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onFullScreen = useCallback(() => {
    setIsFullScreen(true);
  }, [setIsFullScreen]);

  const onExitFullScreen = useCallback(() => {
    setIsFullScreen(false);
  }, [setIsFullScreen]);

  const { showEditor } = useContext(URLStateContext);

  return isFullScreen ? (
    <FullScreen onExitFullScreen={onExitFullScreen} />
  ) : (
    <Wrapper>
      <Top>
        <NavBar />
        <Head onFork={onFork} />
      </Top>
      <Bottom>
        {showEditor ? <Editor /> : null}
        <Viewer onFullScreen={onFullScreen} />
      </Bottom>
    </Wrapper>
  );
};
