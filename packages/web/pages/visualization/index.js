import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Head from 'next/head';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { IDEContainer, FullPage, uiRedux } from 'vizhub-ui';
import { VisualizationViewModel } from 'datavis-tech-presenters';
import Page from '../../components/page';
import { TitledPage } from '../../components/atoms/titledPage';
import { Unfurl } from '../../components/atoms/unfurl';
import { NavBar } from '../../components/organisms/navBar';
import { getJSON } from '../../utils/getJSON';
import { rootReducer } from '../../redux/rootReducer';
import { rootEpicForBrowser, rootEpicForServer } from '../../redux/epics';
import {
  startBuild,
  setCsrfToken,
  setVisualization,
  setUser
} from '../../redux/actionCreators';
import { ForkInvitation } from './forkInvitation';
import { previewUrl, visualizationRoute, visualizationRouteFullscreen, absolute } from '../../routes/routeGenerators';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror-inlet/inlet.css';
import 'vizhub-ui/dist/styles.css';

const {
  actionCreators: {
    initFiles,
    setActiveFile,
    setVisualizationId,
    setVisualizationWidth,
    setVisualizationHeight,
    setVisualizationOwnerUser
  },
  selectors: {
    getFiles
  }
} = uiRedux;

// Exclude file entries where name is null, as does happen.
// Related https://github.com/datavis-tech/vizhub-ui/issues/162
const filterBogusFiles = visualization => {
  if (visualization && visualization.content && visualization.content.files) {
    visualization.content.files = visualization.content.files
      .filter(file => file.name);
  }
  return visualization;
};

export default class extends Page {
  static async getInitialProps({req, query}) {
    const props = await super.getInitialProps({ req });
    const response = await getJSON(`/api/visualization/get/${query.id}`, req);
    props.error = response.error;
    props.visualization = filterBogusFiles(response.visualization);
    props.ownerUser = response.ownerUser;
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

    epicMiddleware.run(process.browser ? rootEpicForBrowser : rootEpicForServer)

    const {
      visualization,
      ownerUser,
      user
    } = this.props;
    
    const {
      id,
      files,
      width,
      height
    } = new VisualizationViewModel(visualization);

    this.store.dispatch(setUser(user));
    this.store.dispatch(setVisualization(visualization));

    this.store.dispatch(initFiles(files));
    this.store.dispatch(setActiveFile('index.html'));
    this.store.dispatch(setVisualizationId(id));
    this.store.dispatch(setVisualizationWidth(width));
    this.store.dispatch(setVisualizationHeight(height));
    this.store.dispatch(setVisualizationOwnerUser(ownerUser));
    this.store.dispatch(startBuild());

    this.store.dispatch(setCsrfToken(props.csrfToken));
  }

  render() {
    const { error, user, csrfToken, visualization, ownerUser } = this.props;
    
    if (error) {
      return <Error statusCode={error.statusCode} />
    }


    const { id, title, description } = new VisualizationViewModel(visualization);
    const userName = ownerUser.userName;

    return (
      <React.Fragment>
        <Head>
          <Unfurl
            title={title}
            description={description}
            image={absolute(previewUrl(id))}
            url={absolute(visualizationRoute({userName, id}))}
          />
        </Head>
        <Provider store={this.store}>
          <TitledPage title={title}>
            <FullPage>
              <NavBar user={user} csrfToken={csrfToken} />
              <ForkInvitation user={user}/>
              <IDEContainer fullScreenUrl={visualizationRouteFullscreen({userName, id})} />
            </FullPage>
          </TitledPage>
        </Provider>
      </React.Fragment>
    );
  }
}
