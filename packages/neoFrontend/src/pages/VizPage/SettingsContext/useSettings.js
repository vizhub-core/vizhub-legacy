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

export const useSettings = () => {
  const [isShowingSettingsModal, setIsShowingSettingsModel] = useState(false);

  const { viz$, submitVizInfoOp } = useContext(VizContext);
  const realtimeModules = useContext(RealtimeModulesContext);

  const showSettingsModal = useCallback(() => {
    setIsShowingSettingsModel(true);
  }, []);

  const hideSettingsModal = useCallback(() => {
    setIsShowingSettingsModel(false);
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

  const vizInfo = useValue(viz$, getVizInfo);

  // Not using getVizHeight here because in this case,
  // we don't want the default value appearing in the form field
  // as the user is typing (e.g. if the value is 0 or empty string).
  const vizHeight = vizInfo.height;

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
    showSettingsModal,
    hideSettingsModal,
    isShowingSettingsModal,
    vizPrivacy,
    setVizPrivacy,
    vizHeight,
    setVizHeight,
    vizInfo
  };
};
