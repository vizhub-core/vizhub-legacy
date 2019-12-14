import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../../authentication/AuthContext';
import { ErrorContext } from '../../../ErrorContext';
import { AlertDialogContext } from '../../../AlertDialogContext';
import { VizContext } from '../VizContext';

export const usePrivacy = history => {
  const [isShowingPrivacyModal, setIsConfirmingPrivacy] = useState(false);

  const { viz$ } = useContext(VizContext);
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
    isShowingPrivacyModal
  };
};
