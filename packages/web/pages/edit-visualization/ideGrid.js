import '../../css/ideGrid.sass';

export const IDEGrid = ({children}) => (
  <div className='ide-grid'>
    { children }
  </div>
);

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
