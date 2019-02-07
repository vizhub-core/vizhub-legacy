import React from 'react';
import { connect } from 'react-redux';
import { uiRedux } from '../redux/index';
import { IDE } from './ide';

const {
  selectors: {
    getFiles,
    getActiveFileName,
    getActiveFileText,
    getVisualizationWidth,
    getVisualizationHeight,
    getRunId,
    getSaveStatus,
    getVisualizationTitle,
    getVisualizationId,
    getVisualizationDescription,
    getVisualizationOwnerUser,
    getSplitPaneDragging
  },
  actionCreators: {
    changeFileText,
    setActiveFile,
    createNewFile,
    renameFile,
    deleteFile,
    forkVisualization,
    splitPaneDragStarted,
    splitPaneDragFinished,
    setHeightPrompt,
    deleteVisualization
  }
} = uiRedux;

const mapStateToProps = state => ({
  files: getFiles(state),
  activeFileName: getActiveFileName(state),
  activeFileText: getActiveFileText(state),
  visualizationWidth: getVisualizationWidth(state),
  visualizationHeight: getVisualizationHeight(state),
  runId: getRunId(state),
  saveStatus: getSaveStatus(state),
  visualizationTitle: getVisualizationTitle(state),
  visualizationId: getVisualizationId(state),
  visualizationDescription: getVisualizationDescription(state),
  visualizationOwnerUser: getVisualizationOwnerUser(state),
  splitPaneDragging: getSplitPaneDragging(state)
});

const mapDispatchToProps = dispatch => ({
  onFileClick: fileName => dispatch(setActiveFile(fileName)),
  onFileTextChange: (fileName, text) => dispatch(changeFileText(fileName, text)),
  onNewFileClick: () => dispatch(createNewFile()),
  onFileDoubleClick: fileName => dispatch(renameFile(fileName)),
  onFileDelete: fileName => dispatch(deleteFile(fileName)),
  onFork: () => dispatch(forkVisualization()),
  onSetHeight: () => dispatch(setHeightPrompt()),
  onSplitPaneDragStarted: () => dispatch(splitPaneDragStarted()),
  onSplitPaneDragFinished: () => dispatch(splitPaneDragFinished()),
  onDeleteVisualization: () => dispatch(deleteVisualization())
});

export const IDEContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(props => (
  <IDE { ...props }/>
));
