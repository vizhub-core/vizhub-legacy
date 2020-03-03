import { useState, useContext, useCallback } from 'react';
import {
  getVizPrivacy,
  privacyChangeOp,
  heightChangeOp,
  getVizInfo
} from 'vizhub-presenters';
import { useValue } from '../../../useValue';
import { RealtimeModulesContext } from '../RealtimeModulesContext';
import { VizContext } from '../VizContext';

export const useShare = () => {
  const [isShowingShareModal, setIsShowingShareModel] = useState(false);

  const { viz$, submitVizInfoOp } = useContext(VizContext);
  const realtimeModules = useContext(RealtimeModulesContext);

  const showShareModal = useCallback(() => {
    setIsShowingShareModel(true);
  }, []);

  const hideShareModal = useCallback(() => {
    setIsShowingShareModel(false);
  }, []);

  const vizPrivacy = useValue(viz$, getVizPrivacy);
  const setVizPrivacy = useCallback(
    newVizPrivacy => {
      submitVizInfoOp(
        privacyChangeOp(
          viz$.getValue().info.privacy,
          newVizPrivacy,
          realtimeModules
        )
      );
    },
    [submitVizInfoOp, realtimeModules, viz$]
  );

  return {
    showShareModal,
    hideShareModal,
    isShowingShareModal
  };
};
