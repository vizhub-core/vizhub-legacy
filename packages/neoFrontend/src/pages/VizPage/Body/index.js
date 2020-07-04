import React, { useContext, useState, useCallback } from 'react';
import { showMobileConsole } from '../../../featureFlags';
import { NavBar } from '../../../NavBar';
import { URLStateContext } from '../URLStateContext';
import { modShowViewer, modMode } from '../../../mobileMods';
import { Wrapper, Top, Bottom } from './styles';
import { MicroConsole } from './MicroConsole';
import { Head } from './Head';
import { FullScreen } from './FullScreen';
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { Mini } from './Mini';
import { RecoveryModeBanner } from './RecoveryModeBanner';

const consoleOutput = `hello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2\nhello world\nn = 1\nn = 2`;

export const Body = () => {
  const {
    isFullScreen,
    showViewer,
    mode,
    showEditor,
    activeFile,
    isRecoveryMode,
    exitRecoveryMode,
  } = useContext(URLStateContext);

  const mod = modMode(mode, showEditor, activeFile);
  const isMini = mod === 'mini';
  const isMicro = mod === 'micro';
  const showTopRight = !isMicro;
  const showMicroConsole = showMobileConsole && isMicro && activeFile;

  const [showTop, setShowTop] = useState(true);
  const toggleShowTop = useCallback(() => setShowTop(!showTop), [
    showTop,
    setShowTop,
  ]);

  return isFullScreen ? (
    <FullScreen />
  ) : (
    <Wrapper>
      {showTop || !activeFile ? (
        <Top>
          {showMicroConsole ? (
            <MicroConsole consoleOutput={consoleOutput} />
          ) : (
            <>
              {isRecoveryMode ? (
                <RecoveryModeBanner exitRecoveryMode={exitRecoveryMode} />
              ) : (
                <NavBar showAuth={showTopRight} />
              )}
              <Head showRight={showTopRight} />
            </>
          )}
        </Top>
      ) : null}
      <Bottom>
        <Editor showTop={showTop} toggleShowTop={toggleShowTop} />
        {modShowViewer(showViewer, showEditor, activeFile) ? <Viewer /> : null}
        {isMini ? <Mini /> : null}
      </Bottom>
    </Wrapper>
  );
};
