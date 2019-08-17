import React, { useContext } from 'react';
import { getVizFiles } from '../../../../../accessors';
import { useValue } from '../../../../../useValue';
import { URLStateContext } from '../../../URLStateContext';
import { VizContext } from '../../../VizContext';
import { Section } from '../Section';
import { FileEntry } from './styles';

export const FilesSection = () => {
  const { activeFile, setActiveFile } = useContext(URLStateContext);

  const { viz$ } = useContext(VizContext);
  const files = useValue(viz$, getVizFiles);

  return (
    <Section title="files" id="files" className="test-editor-files-section">
      {files
        ? files.map(file => (
            <FileEntry
              key={file.name}
              isActive={file.name === activeFile}
              onClick={() => {
                setActiveFile(file.name);
              }}
              className={
                file.name === 'index.html'
                  ? 'test-editor-file-entry-index-html'
                  : ''
              }
            >
              {file.name}
            </FileEntry>
          ))
        : null}
    </Section>
  );
};
