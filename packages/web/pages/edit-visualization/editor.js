import { EditorGrid } from './editorGrid';
import { CodeEditor } from './codeEditor';
import { Files } from './files';
import { findFile } from '../../utils/files';

export const Editor = ({ files, activeFileName, onFileClick, onSave, onTextChange }) => {
  const value = findFile(activeFileName, files).text;
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
