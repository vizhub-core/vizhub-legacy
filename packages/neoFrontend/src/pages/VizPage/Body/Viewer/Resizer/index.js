import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Wrapper } from './styles';
import { URLStateContext } from '../../../URLStateContext';
import { SplitPaneResizeContext } from '../../../SplitPaneResizeContext';

export const Resizer = () => {
  const { showResizer } = useContext(URLStateContext);
  const { moveSplitPane } = useContext(SplitPaneResizeContext);
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = useCallback(() => {
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
  }, []);

  const onMouseMove = useCallback(
    event => {
      event.preventDefault();
      moveSplitPane(event.movementX);
    },
    [moveSplitPane]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [isDragging, onMouseMove, onMouseUp]);

  return showResizer ? <Wrapper onMouseDown={onMouseDown} /> : null;
};
