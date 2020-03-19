import React, { createContext, useContext, useCallback } from 'react';
import { Wrapper, TabWrapper, TabLabel } from './styles';
const ActiveTabContext = createContext();
export const Tabs = ({ activeTab, setActiveTab, children }) => {
  return (
    <Wrapper>
      <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
        {children}
      </ActiveTabContext.Provider>
    </Wrapper>
  );
};

export const Tab = ({ id, children }) => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);

  const handleClick = useCallback(() => {
    setActiveTab(id);
  }, [setActiveTab, id]);

  return (
    <TabWrapper isActive={id === activeTab} onClick={handleClick}>
      <TabLabel>{children}</TabLabel>
    </TabWrapper>
  );
};
