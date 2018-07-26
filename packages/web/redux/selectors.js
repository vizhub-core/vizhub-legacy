//export const getFiles = state => state.ide.files;
//
//export const getActiveFileName = state => state.ide.activeFileName;
//
//export const getActiveFileText = state => {
//  const files = getFiles(state);
//  const activeFileName = getActiveFileName(state);
//  return files && activeFileName
//    ? files.find(({name}) => name === activeFileName).text
//    : '';
//};
//
//export const getVisualizationWidth = state => state.ide.visualizationWidth;
//export const getVisualizationHeight = state => state.ide.visualizationHeight;
//export const getRunId = state => state.ide.runId;
