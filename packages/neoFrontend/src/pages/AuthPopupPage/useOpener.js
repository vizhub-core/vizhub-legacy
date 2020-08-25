import { useEffect, useContext } from 'react';
import { postMessageToOpener } from '../../authentication';
import { ErrorContext } from '../../ErrorContext';

export const useOpener = (getTokenFn) => {
  const { setError } = useContext(ErrorContext);
  
  useEffect(() => {
    getTokenFn().then((data) => {
      if (data.error) {
        setError({ message: data.errorDescription });
      } else {
        postMessageToOpener(data);
      }
    });
  }, [getTokenFn, setError]);
};
