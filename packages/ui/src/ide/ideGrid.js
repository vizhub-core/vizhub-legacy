import React from 'react';
import SplitPane from 'react-split-pane';

export const IDEGrid = props => {
  const {
    children,
    onSplitPaneDragStarted,
    onSplitPaneDragFinished
  } = props;

  return (
    <div className='ide-grid'>
      <SplitPane
        split='vertical'
        defaultSize='50%'
        onDragStarted={onSplitPaneDragStarted}
        onDragFinished={onSplitPaneDragFinished}
      >
        { children }
      </SplitPane>
    </div>
  );
};

IDEGrid.Left = ({children}) => (
  <div className='ide-grid-left'>
    { children }
  </div>
);

IDEGrid.Right = ({children}) => (
  <div className='ide-grid-right'>
    { children }
  </div>
);
