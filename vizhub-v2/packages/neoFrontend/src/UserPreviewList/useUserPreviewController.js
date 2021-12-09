import { useState, useCallback, useEffect } from 'react';

const OUT_OF_USERS_INDEX = -1;

export const useUserPreviewController = (users = []) => {
  const [activeIndex, setActiveIndex] = useState(OUT_OF_USERS_INDEX);
  const [selectedIndex, setSelectedIndex] = useState(OUT_OF_USERS_INDEX);

  useEffect(() => {
    setActiveIndex(OUT_OF_USERS_INDEX);
    setSelectedIndex(OUT_OF_USERS_INDEX);
  }, [users]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowDown' && activeIndex < users.length - 1) {
        event.preventDefault();
        setActiveIndex(activeIndex + 1);
      }

      if (event.key === 'ArrowUp' && activeIndex > 0) {
        event.preventDefault();
        setActiveIndex(activeIndex - 1);
      }

      if (event.key === 'Enter' && activeIndex !== OUT_OF_USERS_INDEX) {
        event.preventDefault();
        setSelectedIndex(activeIndex);
      }
    },
    [users, activeIndex, setActiveIndex, setSelectedIndex]
  );

  const handleUserSelect = useCallback(
    (selectedUser) => {
      const index = users.findIndex((user) => {
        return user === selectedUser;
      });
      setSelectedIndex(index);
    },
    [users, setSelectedIndex]
  );

  const activeUser =
    activeIndex === OUT_OF_USERS_INDEX || users.length === 0
      ? null
      : users[activeIndex];

  const selectedUser =
    selectedIndex === OUT_OF_USERS_INDEX || users.length === 0
      ? null
      : users[selectedIndex];

  return {
    activeUser,
    selectedUser,
    handleKeyDown,
    handleUserSelect,
  };
};
