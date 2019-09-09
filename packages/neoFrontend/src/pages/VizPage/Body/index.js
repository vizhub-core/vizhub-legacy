import React, { useContext } from 'react';
import { showMobileConsole } from '../../../featureFlags';
import { NavBar } from '../../../NavBar';
import { ForkingContext } from '../ForkingContext';
import { URLStateContext } from '../URLStateContext';
import { modShowViewer, modMode } from '../../../mobileMods';
import { Wrapper, Top, Bottom } from './styles';
import { MicroConsole } from './MicroConsole';
import { Head } from './Head';
import { FullScreen } from './FullScreen';
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { Mini } from './Mini';

const consoleOutput = `hello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2`;

export const Body = () => {
  const onFork = useContext(ForkingContext);
  const { isFullScreen, showViewer, mode, showEditor, activeFile } = useContext(
    URLStateContext
  );

  const mod = modMode(mode, showEditor, activeFile);
  const isMini = mod === 'mini';
  const isMicro = mod === 'micro';
  const showTopRight = !isMicro;
  const showMicroConsole = showMobileConsole && isMicro && activeFile;

  return isFullScreen ? (
    <FullScreen />
  ) : (
    <Wrapper>
      <Top>
        {showMicroConsole ? (
          <MicroConsole consoleOutput={consoleOutput} />
        ) : (
          <>
            <NavBar showRight={showTopRight} />
            <Head showRight={showTopRight} onFork={onFork} />
          </>
        )}
      </Top>
      <Bottom>
        <Editor />
        {modShowViewer(showViewer, showEditor, activeFile) ? <Viewer /> : null}
        {isMini ? <Mini /> : null}
      </Bottom>
    </Wrapper>
  );
};
