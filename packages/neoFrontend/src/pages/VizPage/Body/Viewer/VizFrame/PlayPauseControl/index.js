import React, {
  useMemo,
  useCallback,
  useContext,
  useState,
  useEffect
} from 'react';
import { PlayPauseSVG } from '../../../../../../svg';
import { LargeIcon } from '../../../../../styles';
import { RunContext } from '../../../../RunContext';
import { URLStateContext } from '../../../../URLStateContext';

export const PlayPauseControl = () => {
  const {
    runTimerProgress$,
    isAutoRunEnabled,
    setIsAutoRunEnabled,
    needsManualRun,
    run
  } = useContext(RunContext);
  const { activeFile } = useContext(URLStateContext);
  const [runTimerProgress, setRunTimerProgress] = useState();

  useEffect(() => {
    const subscription = runTimerProgress$.subscribe(setRunTimerProgress);
    return () => subscription.unsubscribe();
  }, [runTimerProgress$]);

  const onIconClick = useCallback(() => {
    if (needsManualRun) {
      run();
    } else {
      setIsAutoRunEnabled(!isAutoRunEnabled);
    }
  }, [isAutoRunEnabled, setIsAutoRunEnabled, needsManualRun, run]);

  const iconTooltip = useMemo(
    () =>
      needsManualRun
        ? 'Run now (Shift + Enter)'
        : isAutoRunEnabled
        ? 'Disable auto-run'
        : 'Enable auto-run',
    [isAutoRunEnabled, needsManualRun]
  );

  // Handle global keyboard shortcut.
  //useEffect(() => {
  //  const listener = event => {
  //    if(event.shiftKey && event.code === "Enter"){
  //      run();
  //    }
  //    console.log(event);
  //  };
  //  document.addEventListener('keydown', listener);
  //  return () => {
  //    document.removeEventListener('keydown', listener);
  //  };
  //}, [run]);

  return (
    <LargeIcon
      leftmost={true}
      rightmost={true}
      onClick={onIconClick}
      title={iconTooltip}
    >
      <PlayPauseSVG
        runTimerProgress={runTimerProgress}
        isAutoRunEnabled={isAutoRunEnabled}
        needsManualRun={needsManualRun}
        showButton={!!activeFile}
      />
    </LargeIcon>
  );
};
