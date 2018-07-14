import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Page from '../../components/page';
import { TitledPage } from '../../components/atoms/titledPage';
import { NavBar } from '../../components/organisms/navBar';
import { FullPage } from '../../components/atoms/fullPage';
import { CodeEditor } from './codeEditor';

const html = visualization => visualization.content.files[0].text;

export default class extends Page {
  static async getInitialProps({req, query}) {
    const props = await super.getInitialProps({ req });
    const id = query.id;

    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const url = `${baseUrl}/api/visualization/get/${id}`;
    const response = await (await fetch(url)).json();

    props.id = id;
    props.visualization = response.visualization;
    props.error = response.error;

    return props;
  }

  constructor(props) {
    super(props);

    this.onSave = async (html) => {
      const visualization = props.visualization;
      visualization.content.files[0].text = html;

      const { csrfToken } = props;
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
    };
  }

  render() {
    const { error, visualization, user, csrfToken } = this.props;

    return error
      ? <Error statusCode={error.statusCode} />
      : (
        <TitledPage title='Edit Visualization'>
          <FullPage>
            <NavBar user={user} csrfToken={csrfToken} />
            <CodeEditor value={html(visualization)} onSave={this.onSave} />
          </FullPage>
        </TitledPage>
      );
  }
}
