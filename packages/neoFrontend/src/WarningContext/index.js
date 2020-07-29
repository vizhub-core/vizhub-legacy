import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router';

export const WarningContext = createContext();

export const WarningProvider = ({ children }) => {
  const [warning, setWarning] = useState(null);
  const contextValue = { warning, setWarning };

  const location = useLocation();

  useEffect(() => {
    setWarning(null);
  }, [location]);

  return (
    <WarningContext.Provider value={contextValue}>
      {children}
    </WarningContext.Provider>
  );
};
