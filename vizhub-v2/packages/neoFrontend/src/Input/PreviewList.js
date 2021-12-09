import React from 'react';
import { Container, ClickableEntry } from '../UserPreviewList/styles';

export const PreviewList = ({ item, items, onSelect }) => {
  if (items.length === 0) return null;
  return (
    <Container>
      {items &&
        items.map((itemToRender) => (
          <ClickableEntry
            className={item === itemToRender ? 'active' : ''}
            key={itemToRender.id}
            onClick={() => onSelect(itemToRender)}
          >
            {itemToRender.id}
          </ClickableEntry>
        ))}
    </Container>
  );
};
