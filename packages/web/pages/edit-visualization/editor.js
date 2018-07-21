import { EditorGrid } from './editorGrid';
import { CodeEditor } from 'vizhub-ui';
import { Files } from './files';

export const Editor = props => {
  const {
    files,
    activeFileName,
    onFileClick,
    onSave,
    onTextChange
  } = props;

  const value = files.find(({name}) => name === activeFileName).text;

  return (
    <EditorGrid>
      <EditorGrid.Left>
        <Files
          files={files}
          activeFileName={activeFileName}
          onFileClick={onFileClick}
        />
      </EditorGrid.Left>
      <EditorGrid.Center>
        <CodeEditor
          value={value}
          onSave={onSave}
          onTextChange={onTextChange}
        />
      </EditorGrid.Center>
    </EditorGrid>
  );
};
