import React, { useContext } from 'react';
import { NavBar } from '../../../NavBar';
import { ForkingContext } from '../ForkingContext';
import { URLStateContext } from '../URLStateContext';
import { modShowViewer, modMode } from '../mobileMods';
import { Wrapper, Top, Bottom } from './styles';
import { Head } from './Head';
import { FullScreen } from './FullScreen';
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { Mini } from './Mini';

export const Body = () => {
  const onFork = useContext(ForkingContext);
  const { isFullScreen, showViewer, mode, showEditor } = useContext(
    URLStateContext
  );

  const mod = modMode(mode, showEditor);
  const isMini = mod === 'mini';
  const showTopRight = mod !== 'micro';

  return isFullScreen ? (
    <FullScreen />
  ) : (
    <Wrapper>
      <Top>
        <NavBar showRight={showTopRight} />
        <Head showRight={showTopRight} onFork={onFork} />
      </Top>
      <Bottom>
        <Editor />
        {modShowViewer(showViewer, showEditor) ? <Viewer /> : null}
        {isMini ? <Mini /> : null}
      </Bottom>
    </Wrapper>
  );
};
