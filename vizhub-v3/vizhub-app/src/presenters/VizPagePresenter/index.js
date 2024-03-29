import React, {
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
} from 'react';
import { VizPage } from '../../ui';
import { useShareDBConnection } from '../useShareDBConnection';
import { LogInWidgetPresenter } from '../LogInWidgetPresenter';
import { useViz } from './useViz';
import { CodeEditor } from './CodeEditor';

const Body = ({
  viz: {
    vizInfo: { title },
    vizContent: { files },
  },
  renderLogInWigdet,
  renderCodeEditor,
  renderVizRunner,
}) => {
  // Compute an alphabetized list of file metadata
  // for use in the editor sidebar.
  const sortedFileMetadata = useMemo(
    () =>
      Object.entries(files)
        .map(([fileId, file]) => ({
          fileId,
          name: file.name,
        }))
        .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)),
    [files]
  );

  // This function gets the name of a file
  // for a given file id.
  const getFileName = useCallback(
    (vizFileId) => files[vizFileId].name,
    [files]
  );

  return (
    <VizPage
      title={title}
      sortedFileMetadata={sortedFileMetadata}
      files={files}
      getFileName={getFileName}
      renderCodeEditor={renderCodeEditor}
      renderLogInWigdet={renderLogInWigdet}
      renderVizRunner={renderVizRunner}
    />
  );
};

export const VizPagePresenter = ({ pageData, renderLogInWigdet }) => {
  // Initialize the ShareDB connection via WebSocket.
  const shareDBConnection = useShareDBConnection();

  const { vizSnapshot } = pageData;
  const { viz, vizContentDoc } = useViz({ vizSnapshot, shareDBConnection });

  const renderVizRunner = useCallback(
    (svgRef) => {
      const [dimensions, setDimensions] = useState(null);

      useEffect(() => {
        const { clientWidth, clientHeight } = svgRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
        console.log({ width: clientWidth, height: clientHeight });
      }, [svgRef]);

      //    console.log(viz.vizContent.files['7548392'].text);
      const code = viz.vizContent.files['7548392'].text;

      // TODO get this from vizInfo
      // TODO listen for resize changes
      const vizHeight = 500;

      return dimensions ? (
        <iframe
          srcdoc={code}
          style={{
            width: dimensions.width + 'px',
            height: dimensions.height + 'px',
            transform: `scale(${Math.max(dimensions.height / vizHeight, 1)})`,
            transformOrigin: '0 0',
          }}
        />
      ) : null;
    },
    [viz]
  );

  return viz ? (
    <Body
      viz={viz}
      renderLogInWigdet={() => (
        <LogInWidgetPresenter authenticatedUser={pageData.authenticatedUser} />
      )}
      renderCodeEditor={(activeFileId) => (
        <CodeEditor vizContentDoc={vizContentDoc} activeFileId={activeFileId} />
      )}
      renderVizRunner={renderVizRunner}
    />
  ) : (
    // TODO styling for this case
    'This viz was deleted'
  );
};
