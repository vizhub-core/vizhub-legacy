import { useEffect, useState } from 'react';

export const useOpSourceTracker = (shareDBDoc) => {
  const [isEditedLocally, setIsEditedLocally] = useState(false);

  useEffect(() => {
    if (!shareDBDoc) {
      return;
    }
    const listener = (_, source) => {
      if (source) {
        setIsEditedLocally(true);
        shareDBDoc.removeListener('op', listener);
      }
    };

    shareDBDoc.on('op', listener);

    return () => {
      shareDBDoc.removeListener('op', listener);
    };
  }, [shareDBDoc]);

  return isEditedLocally;
};
