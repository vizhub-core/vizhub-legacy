import { useEffect, useState } from 'react';
import { postMessageToOpener } from '../../authentication';
export const useOpener = (getTokenFn) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    getTokenFn().then((data) => {
      if (data.error) {
        setError(new Error(data.errorDescription));
      } else {
        postMessageToOpener(data);
      }
    });
  }, [getTokenFn, setError]);

  return error;
};
