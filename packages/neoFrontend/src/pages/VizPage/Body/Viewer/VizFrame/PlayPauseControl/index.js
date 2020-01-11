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

export const PlayPauseControl = () => {
  const {
    runTimerProgress$,
    isAutoRunEnabled,
    setIsAutoRunEnabled
  } = useContext(RunContext);
  const [runTimerProgress, setRunTimerProgress] = useState();

  useEffect(() => {
    const subscription = runTimerProgress$.subscribe(setRunTimerProgress);
    return () => subscription.unsubscribe();
  }, [runTimerProgress$]);

  const onIconClick = useCallback(() => {
    setIsAutoRunEnabled(!isAutoRunEnabled);
  }, [isAutoRunEnabled, setIsAutoRunEnabled]);

  const iconTooltip = useMemo(
    () => (isAutoRunEnabled ? 'Disable auto-run' : 'Enable auto-run'),
    [isAutoRunEnabled]
  );

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
      />
    </LargeIcon>
  );
};
