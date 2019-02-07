export const getFiles = state => state.ide.files;

export const getActiveFileName = state => state.ide.activeFileName;

export const getActiveFileText = state => {
  const files = getFiles(state);
  const activeFileName = getActiveFileName(state);
  return files && activeFileName
    ? files.find(({name}) => name === activeFileName).text
    : '';
};

export const getVisualizationWidth = state => state.ide.visualizationWidth;
export const getVisualizationHeight = state => state.ide.visualizationHeight;
export const getRunId = state => state.ide.runId;
export const getSaveStatus = state => state.ide.saveStatus;
export const getVisualizationTitle = state => state.ide.visualizationTitle;
export const getVisualizationId = state => state.ide.visualizationId;
export const getVisualizationDescription = state => state.ide.visualizationDescription;

export const getVisualizationOwnerUser = state =>
  state.ide.visualizationOwnerUser;

export const getFile = (state, fileName) => getFiles(state)
  .filter(file => file.name === fileName)[0];

export const getSplitPaneDragging = state => state.ide.splitPaneDragging;
