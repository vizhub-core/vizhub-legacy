import { useState, useContext, useCallback } from 'react';
import {
  getVizPrivacy,
  privacyChangeOp,
  getVizHeight,
  heightChangeOp
} from 'vizhub-presenters';
import { useValue } from '../../../useValue';
import { RealtimeModulesContext } from '../RealtimeModulesContext';
import { VizContext } from '../VizContext';

export const usePrivacy = () => {
  const [isShowingPrivacyModal, setIsConfirmingPrivacy] = useState(false);

  const { viz$, submitVizInfoOp } = useContext(VizContext);
  const realtimeModules = useContext(RealtimeModulesContext);

  const showPrivacyModal = useCallback(() => {
    setIsConfirmingPrivacy(true);
  }, []);

  const hidePrivacyModal = useCallback(() => {
    setIsConfirmingPrivacy(false);
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

  const vizHeight = useValue(viz$, getVizHeight);
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
    showPrivacyModal,
    hidePrivacyModal,
    isShowingPrivacyModal,
    vizPrivacy,
    setVizPrivacy,
    vizHeight,
    setVizHeight
  };
};
