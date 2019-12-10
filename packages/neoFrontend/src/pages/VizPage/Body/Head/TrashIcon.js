import React, { useState, useCallback } from 'react';
import { HeadIcon } from './styles';
import { TrashSVG } from '../../../../svg';

export const TrashIcon = ({ onClick }) => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseEnter = useCallback(() => setIsHovering(true), []);
  const onMouseLeave = useCallback(() => setIsHovering(false), []);
  return (
    <HeadIcon
      title="Delete this Viz"
      onClick={onClick}
      rightmost={true}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <TrashSVG isRed={isHovering} />
    </HeadIcon>
  );
};
