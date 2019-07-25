import React, { useContext } from 'react';
import { NavBar } from '../../../NavBar';
import { ForkingContext } from '../ForkingContext';
import { URLStateContext } from '../URLStateContext';
import { isSmallScreen } from '../isSmallScreen'
import { Wrapper, Top, Bottom } from './styles';
import { Head } from './Head';
import { FullScreen } from './FullScreen';
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { Mini } from './Mini';

export const Body = () => {
  const onFork = useContext(ForkingContext);
  const { isFullScreen, showViewer, isMini, showEditor } = useContext(URLStateContext);

  let viewerVisible = showViewer;
  if(showViewer && isSmallScreen && showEditor){
    viewerVisible = false;
  }

  return isFullScreen ? (
    <FullScreen />
  ) : (
    <Wrapper>
      <Top>
        <NavBar />
        <Head onFork={onFork} />
      </Top>
      <Bottom>
        <Editor />
        {viewerVisible ? <Viewer /> : null}
        {isMini ? <Mini /> : null}
      </Bottom>
    </Wrapper>
  );
};
