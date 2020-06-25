import React, { createContext, useState } from 'react';

export const WarningContext = createContext();

export const WarningProvider = ({ children }) => {
  const [warning, setWarning] = useState(null);
  const contextValue = { warning, setWarning };
  return (
    <WarningContext.Provider value={contextValue}>
      {children}
    </WarningContext.Provider>
  );
};
