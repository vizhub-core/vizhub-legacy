import { useState, useContext, useCallback } from 'react';
import { getVizPrivacy } from '../../../accessors';
import { useValue } from '../../../useValue';
import { AuthContext } from '../../../authentication/AuthContext';
import { ErrorContext } from '../../../ErrorContext';
import { AlertDialogContext } from '../../../AlertDialogContext';
import { VizContext } from '../VizContext';

export const usePrivacy = history => {
  const [isShowingPrivacyModal, setIsConfirmingPrivacy] = useState(false);

  const { viz$, submitVizInfoOp } = useContext(VizContext);
  const vizPrivacy = useValue(viz$, getVizPrivacy);
  const { me } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);

  const showPrivacyModal = useCallback(() => {
    setIsConfirmingPrivacy(true);
  }, []);

  const hidePrivacyModal = useCallback(() => {
    setIsConfirmingPrivacy(false);
  }, []);

  return {
    showPrivacyModal,
    hidePrivacyModal,
    isShowingPrivacyModal,
    vizPrivacy
  };
};
