import { connect } from 'react-redux';
import { FullPage, IDE, actionCreators, selectors } from 'vizhub-ui';

// TODO move this into ui package

const {
  getFiles,
  getActiveFileName,
  getActiveFileText,
  getVisualizationWidth,
  getVisualizationHeight,
  getRunId
} = selectors;

const {
  changeFileText,
  save,
  setActiveFile
} = actionCreators;

const mapStateToProps = state => ({
  files: getFiles(state),
  activeFileName: getActiveFileName(state),
  activeFileText: getActiveFileText(state),
  visualizationWidth: getVisualizationWidth(state),
  visualizationHeight: getVisualizationHeight(state),
  runId: getRunId(state)
});

const mapDispatchToProps = dispatch => ({
  onFileClick: fileName => dispatch(setActiveFile(fileName)),
  //onSave: () => dispatch(save()),
  onFileTextChange: (fileName, text) => dispatch(changeFileText(fileName, text))
});

export const IDEContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(props => (
  <IDE
    files={props.files}
    activeFileName={props.activeFileName}
    activeFileText={props.activeFileText}
    onFileClick={props.onFileClick}
    onSave={props.onSave}
    onFileTextChange={props.onFileTextChange}
    visualizationWidth={props.visualizationWidth}
    visualizationHeight={props.visualizationHeight}
    runId={props.runId}
  />
));
