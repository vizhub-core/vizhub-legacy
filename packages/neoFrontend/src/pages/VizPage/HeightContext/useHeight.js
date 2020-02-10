import { useState, useContext, useCallback } from 'react';
import { getVizHeight, heightChangeOp } from 'vizhub-presenters';
import { useValue } from '../../../useValue';
import { RealtimeModulesContext } from '../RealtimeModulesContext';
import { VizContext } from '../VizContext';

export const useHeight = () => {
  const [isShowingHeightModal, setIsConfirmingHeight] = useState(false);

  const { viz$, submitVizInfoOp } = useContext(VizContext);
  const vizHeight = useValue(viz$, getVizHeight);
  const realtimeModules = useContext(RealtimeModulesContext);

  const showHeightModal = useCallback(() => {
    setIsConfirmingHeight(true);
  }, []);

  const hideHeightModal = useCallback(() => {
    setIsConfirmingHeight(false);
  }, []);

  const setVizHeight = useCallback(
    newVizHeight => {
      submitVizInfoOp(
        heightChangeOp(
          viz$.getValue().info.height,
          newVizHeight,
          realtimeModules
        )
      );
    },
    [submitVizInfoOp, realtimeModules, viz$]
  );

  return {
    showHeightModal,
    hideHeightModal,
    isShowingHeightModal,
    vizHeight,
    setVizHeight
  };
};
