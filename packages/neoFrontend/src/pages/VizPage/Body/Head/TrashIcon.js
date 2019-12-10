import React, { useState, useCallback } from 'react';
import { TrashSVG } from '../../../../svg';

export const TrashIcon = ({ onClick, iconComponent }) => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseEnter = useCallback(() => setIsHovering(true), []);
  const onMouseLeave = useCallback(() => setIsHovering(false), []);
  const IconComponent = iconComponent;
  return (
    <IconComponent
      title="Delete this Viz"
      onClick={onClick}
      rightmost={true}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <TrashSVG isRed={isHovering} />
    </IconComponent>
  );
};
