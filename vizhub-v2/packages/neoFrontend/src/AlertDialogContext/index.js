import React, { createContext, useState, useCallback } from 'react';
import { Modal } from '../Modal';

export const AlertDialogContext = createContext();

export const AlertDialogProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const onClose = useCallback(() => {
    setMessage(null);
  }, []);

  return (
    <AlertDialogContext.Provider value={setMessage}>
      {children}
      {message ? <Modal onClose={onClose}>{message}</Modal> : null}
    </AlertDialogContext.Provider>
  );
};
