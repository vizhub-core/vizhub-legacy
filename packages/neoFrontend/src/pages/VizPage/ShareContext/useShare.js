import { useState, useCallback } from 'react';

export const useShare = () => {
  const [isShowingShareModal, setIsShowingShareModel] = useState(false);

  const showShareModal = useCallback(() => {
    setIsShowingShareModel(true);
  }, []);

  const hideShareModal = useCallback(() => {
    setIsShowingShareModel(false);
  }, []);

  return {
    showShareModal,
    hideShareModal,
    isShowingShareModal
  };
};
