import React from 'react';
import { EditorGrid } from './editorGrid';
import { CodeEditor } from './codeEditor';
import { FileList } from './fileList';
import { preventDefault } from '../utils/preventDefault'

export const VisualizationEditor = props => {
  const {
    files,
    activeFileName,
    activeFileText,
    onFileClick,
    onFileDoubleClick,
    onFileTextChange,
    onNewFileClick,
    onFileDelete,
    onFork,
    onSetHeight,
    visualizationId,
    onDeleteVisualization
  } = props;

  return (
    <EditorGrid>
      <EditorGrid.Left>
        <FileList
          files={files}
          activeFileName={activeFileName}
          onFileClick={onFileClick}
          onFileDoubleClick={onFileDoubleClick}
          onFileDelete={onFileDelete}
        />
        <a
          className='action-link'
          href='#new-file'
          title='Create a new file'
          onClick={preventDefault(onNewFileClick)}
        >
          new file
        </a>
        <a
          className='action-link'
          href='#fork'
          title='Fork this visualization'
          onClick={preventDefault(onFork)}
        >
          fork
        </a>
        <a
          className='action-link'
          href='#set-height'
          title='Set the visualization height'
          onClick={preventDefault(onSetHeight)}
        >
          set height
        </a>
        <a
          className='action-link'
          href={`/api/visualization/export/${visualizationId}`}
          target='_blank'
          title='Download the code for this visualization'
        >
          export
        </a>
        <a
          className='action-link'
          href='#delete-visualization'
          onClick={preventDefault(onDeleteVisualization)}
          title='Delete this visualization'
        >
          delete
        </a>
      </EditorGrid.Left>
      <EditorGrid.Center>
        <CodeEditor
          fileName={activeFileName}
          value={activeFileText}
          onTextChange={text => onFileTextChange(activeFileName, text)}
        />
      </EditorGrid.Center>
    </EditorGrid>
  );
};
