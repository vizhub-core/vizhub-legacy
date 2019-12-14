import { useState, useContext, useCallback } from 'react';
import { getVizPrivacy, privacyChangeOp } from '../../../accessors';
import { useValue } from '../../../useValue';
import { RealtimeModulesContext } from '../RealtimeModulesContext';
import { VizContext } from '../VizContext';

export const usePrivacy = history => {
  const [isShowingPrivacyModal, setIsConfirmingPrivacy] = useState(false);

  const { viz$, submitVizInfoOp } = useContext(VizContext);
  const vizPrivacy = useValue(viz$, getVizPrivacy);
  const realtimeModules = useContext(RealtimeModulesContext);

  const showPrivacyModal = useCallback(() => {
    setIsConfirmingPrivacy(true);
  }, []);

  const hidePrivacyModal = useCallback(() => {
    setIsConfirmingPrivacy(false);
  }, []);

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
    showPrivacyModal,
    hidePrivacyModal,
    isShowingPrivacyModal,
    vizPrivacy,
    setVizPrivacy
  };
};
