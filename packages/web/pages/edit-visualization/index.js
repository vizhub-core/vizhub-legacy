import fetch from 'isomorphic-fetch';
import Error from 'next/error';

import { visualizationToViewModel } from 'datavis-tech-presenters';

import Page from '../../components/page';
import { TitledPage } from '../../components/atoms/titledPage';
import { NavBar } from '../../components/organisms/navBar';
import { FullPage } from '../../components/atoms/fullPage';
import { getJSON } from '../../utils/getJSON';

import { CodeEditor } from './codeEditor';
import { EditorGrid } from './editorGrid';
import { Files } from './files';
import { findFile, hasName } from '../../utils/files';

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

    const { files } = visualization.content;
    const activeFile = findFile(activeFileName, files);

    return (
      <TitledPage title='Edit Visualization'>
        <FullPage>
          <NavBar user={user} csrfToken={csrfToken} />
          <EditorGrid>
            <EditorGrid.Left>
              <Files
                files={files}
                activeFileName={activeFileName}
                onFileClick={this.onFileClick}
              />
            </EditorGrid.Left>
            <EditorGrid.Center>
              <CodeEditor
                value={activeFile.text}
                onSave={this.onSave}
                onTextChange={this.onTextChange}
              />
            </EditorGrid.Center>
          </EditorGrid>
        </FullPage>
      </TitledPage>
    );
  }
}
