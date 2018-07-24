import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { IDE } from 'vizhub-ui';
import { VisualizationViewModel } from 'datavis-tech-presenters';
import Page from '../../components/page';
import { TitledPage } from '../../components/atoms/titledPage';
import { NavBar } from '../../components/organisms/navBar';
import { FullPage } from '../../components/atoms/fullPage';
import { getJSON } from '../../utils/getJSON';
import { hasName } from '../../utils/files';

import 'codemirror/lib/codemirror.css';
import 'vizhub-ui/src/css/ubuntu.css';

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

    this.state = {
      activeFileName: 'index.html',
      visualization: props.visualization
    };

    this.onSave = this.onSave.bind(this);
    this.onFileClick = this.onFileClick.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  async onSave(html) {
    const { csrfToken } = this.props;
    const { visualization } = this.state;

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

  onFileClick(clickedFileName) {
    this.setState({
      activeFileName: clickedFileName
    });
  }

  onTextChange(newText) {
    const { activeFileName, visualization } = this.state;
    const isActive = hasName(activeFileName);
    this.setState({
      visualization: Object.assign(visualization, {
        content: {
          files: visualization.content.files.map(file => (
            isActive(file)
              ? Object.assign(file, { text: newText })
              : file
          ))
        }
      })
    });
  }

  render() {
    const { error, user, csrfToken } = this.props;
    const { activeFileName, visualization } = this.state;
    
    if (error) {
      return <Error statusCode={error.statusCode} />
    }

    const { files, width, height } = new VisualizationViewModel(visualization);

    return (
      <TitledPage title='Edit Visualization'>
        <FullPage>
          <NavBar user={user} csrfToken={csrfToken} />
          <IDE />
        </FullPage>
      </TitledPage>
    );
  }
}
