import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { IDEContainer, FullPage, uiRedux } from 'vizhub-ui';
import { VisualizationViewModel } from 'datavis-tech-presenters';
import Page from '../../components/page';
import { TitledPage } from '../../components/atoms/titledPage';
import { NavBar } from '../../components/organisms/navBar';
import { getJSON } from '../../utils/getJSON';
import { rootReducer } from '../../redux/rootReducer';
import { rootEpic } from '../../redux/epics';
import {
  startBuild,
  setCsrfToken,
  setVisualization
} from '../../redux/actionCreators';
import { ForkInvitation } from './forkInvitation';
import 'codemirror/lib/codemirror.css';
import 'vizhub-ui/dist/styles.css';

const {
  actionCreators: {
    initFiles,
    setActiveFile,
    setVisualizationWidth,
    setVisualizationHeight
  },
  selectors: {
    getFiles
  }
} = uiRedux;

export default class extends Page {
  static async getInitialProps({req, query}) {
    const props = await super.getInitialProps({ req });
    const response = await getJSON(`/api/visualization/get/${query.id}`, req);
    props.error = response.error;
    props.visualization = response.visualization;
    return props;
  }

  constructor(props) {
    super(props);
    if (props.error) {
      return;
    }

    const epicMiddleware = createEpicMiddleware();

    this.store = createStore(
      rootReducer,
      applyMiddleware(epicMiddleware)
    );

    if (process.browser) {
      epicMiddleware.run(rootEpic);
    }

    const { visualization } = this.props;
    
    const {
      files,
      width,
      height
    } = new VisualizationViewModel(visualization);

    this.store.dispatch(setVisualization(visualization));

    // Possibly set these in an epic in response to setVisualization?
    this.store.dispatch(initFiles(files));
    this.store.dispatch(setActiveFile('index.html'));
    this.store.dispatch(setVisualizationWidth(width));
    this.store.dispatch(setVisualizationHeight(height));
    this.store.dispatch(startBuild());

    this.store.dispatch(setCsrfToken(props.csrfToken));
  }

  render() {
    const { error, user, csrfToken } = this.props;
    
    if (error) {
      return <Error statusCode={error.statusCode} />
    }

    return (
      <TitledPage title='Edit Visualization'>
        <FullPage>
          <NavBar user={user} csrfToken={csrfToken} />
          <Provider store={this.store}>
            <Fragment>
              <ForkInvitation />
              <IDEContainer />
            </Fragment>
          </Provider>
        </FullPage>
      </TitledPage>
    );
  }
}
