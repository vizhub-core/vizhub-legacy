import React from 'react';
import { render } from 'react-dom';
import { TestingApp } from './testingApp';
import { files } from './files';
import { uiRedux } from '../exports';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { rootReducer } from './rootReducer';
import { saveSimulationEpic } from './saveSimulationEpic';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror-inlet/inlet.css';
import '../dist-symlink/styles.css';

const {
  actionCreators: {
    initFiles,
    setActiveFile,
    setVisualizationWidth,
    setVisualizationHeight,
    setVisualizationId,
    setVisualizationOwnerUser
  },
  epics: {
    runEpic,
    autoSaveEpic,
    promptForNewFileNameEpic,
    promptForNewHeightEpic,
    promptForRenameEpic,
    confirmFileDeleteEpic,
    confirmVisualizationDeleteEpic,
    updateTitleEpic,
    updateDescriptionEpic
  }
} = uiRedux;

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(combineEpics(
  runEpic,
  autoSaveEpic,
  saveSimulationEpic,
  promptForNewFileNameEpic,
  promptForNewHeightEpic,
  promptForRenameEpic,
  confirmFileDeleteEpic,
  confirmVisualizationDeleteEpic,
  updateTitleEpic,
  updateDescriptionEpic
));

store.dispatch(initFiles(files));
store.dispatch(setActiveFile('index.html'));
store.dispatch(setVisualizationWidth(960));
store.dispatch(setVisualizationHeight(500));    
store.dispatch(setVisualizationId('1234'));    
store.dispatch(setVisualizationOwnerUser({
  id: "84752",
  userName: "joe",
  fullName: "Joe Schmoe",
  avatarUrl: "https://avatars1.githubusercontent.com/u/68416?v=4"
}));    

render(
  <Provider store={store}>
    <TestingApp />
  </Provider>,
  document.getElementById('root')
);
