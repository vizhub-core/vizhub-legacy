import { useState, useCallback } from 'react';
export const defaultKeyMap = 'sublime';
export const useVimMode = () => {
  const [keyMap, setKeyMap] = useState(defaultKeyMap);
  const isVimMode = keyMap === 'vim';

  const toggleVimMode = useCallback(() => {
    setKeyMap(isVimMode ? defaultKeyMap : 'vim');
  }, [setKeyMap, isVimMode]);

  return { keyMap, isVimMode, toggleVimMode };
};
