import '../../css/editorGrid.sass';

export const EditorGrid = ({children}) => (
  <div className='editor-grid'>
    { children }
  </div>
);

EditorGrid.Left = ({children}) => (
  <div className='editor-grid-left'>
    { children }
  </div>
);

EditorGrid.Center = ({children}) => (
  <div className='editor-grid-center'>
    { children }
  </div>
);
