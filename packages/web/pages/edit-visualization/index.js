import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { IDE, FullPage, actionCreators, selectors } from 'vizhub-ui';
import { VisualizationViewModel } from 'datavis-tech-presenters';
import Page from '../../components/page';
import { TitledPage } from '../../components/atoms/titledPage';
import { NavBar } from '../../components/organisms/navBar';
import { getJSON } from '../../utils/getJSON';
import { rootReducer } from '../../redux/rootReducer';
import { rootEpic } from '../../redux/rootEpic';
import { startBuild } from '../../redux/actionCreators';
import { IDEContainer } from './ideContainer';
import 'codemirror/lib/codemirror.css';
import 'vizhub-ui/dist/styles.css';

const {
  initFiles,
  setActiveFile,
  setVisualizationWidth,
  setVisualizationHeight
} = actionCreators;

const { getFiles } = selectors;

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
    this.onSave = this.onSave.bind(this);

    const epicMiddleware = createEpicMiddleware();

    this.store = createStore(
      rootReducer,
      applyMiddleware(epicMiddleware)
    );

    epicMiddleware.run(rootEpic);
    
    const {
      files,
      width,
      height
    } = new VisualizationViewModel(this.props.visualization);

    this.store.dispatch(initFiles(files));
    this.store.dispatch(setActiveFile('index.html'));
    this.store.dispatch(setVisualizationWidth(width));
    this.store.dispatch(setVisualizationHeight(height));
    this.store.dispatch(startBuild());
  }

  async onSave(html) {
    const { csrfToken, visualization } = this.props;
    visualization.files = getFiles(this.store.getState());

    const url = `/api/visualization/save`;
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'x-csrf-token': csrfToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ visualization })
    };
    const response = await (await fetch(url, options)).json();
    console.log(response);
    // TODO saving ... saved
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
            <IDEContainer onSave={this.onSave} />
          </Provider>
        </FullPage>
      </TitledPage>
    );
  }
}
