import React, { useEffect } from 'react';
import { Input } from './Input';
import { PreviewList } from './PreviewList';
import { usePreviewController } from './usePreviewController';
import { FocusableFragment } from './styles';


export const Autocomplete = ({ value, items, size, placeholder, onChange, onSelect }) => {
  const {
    activeItem,
    selectedItem,
    handleKeyDown,
    handleItemSelect,
  } = usePreviewController(items);

  useEffect(() => {
    if (selectedItem) {
      onSelect(selectedItem.id);
    }
  }, [selectedItem, onSelect]);

  return (
    <FocusableFragment tabIndex="-1" onKeyDown={handleKeyDown} >
      <Input
        tabIndex="-1"
        value={value}
        size={size}
        placeholder={placeholder}
        onChange={onChange}
      />
      <PreviewList
        item={activeItem}
        items={items}
        onSelect={handleItemSelect}
      />
    </FocusableFragment>
  );
};
