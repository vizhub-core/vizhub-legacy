import { useState, useCallback, useEffect } from 'react';

const OUT_OF_INDEX = -1;

export const usePreviewController = (items = []) => {
  const [activeIndex, setActiveIndex] = useState(OUT_OF_INDEX);
  const [selectedIndex, setSelectedIndex] = useState(OUT_OF_INDEX);

  useEffect(() => {
    setActiveIndex(OUT_OF_INDEX);
    setSelectedIndex(OUT_OF_INDEX);
  }, [items]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowDown' && activeIndex < items.length - 1) {
        event.preventDefault();
        setActiveIndex(activeIndex + 1);
      }

      if (event.key === 'ArrowUp' && activeIndex > 0) {
        event.preventDefault();
        setActiveIndex(activeIndex - 1);
      }

      if (event.key === 'Enter' && activeIndex !== OUT_OF_INDEX) {
        event.preventDefault();
        setSelectedIndex(activeIndex);
      }
    },
    [items, activeIndex, setActiveIndex, setSelectedIndex]
  );

  const handleItemSelect = useCallback(
    (selectedItem) => {
      const index = items.findIndex((item) => {
        return item === selectedItem;
      });
      setSelectedIndex(index);
    },
    [items, setSelectedIndex]
  );

  const activeItem =
    activeIndex === OUT_OF_INDEX || items.length === 0
      ? null
      : items[activeIndex];

  const selectedItem =
    selectedIndex === OUT_OF_INDEX || items.length === 0
      ? null
      : items[selectedIndex];

  return {
    activeItem,
    selectedItem,
    handleKeyDown,
    handleItemSelect,
  };
};
