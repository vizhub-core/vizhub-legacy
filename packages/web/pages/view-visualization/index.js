import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Page from '../../components/page';
import { TitledPage } from '../../components/atoms/titledPage';
import { Runner } from '../../components/atoms/runner';
import { SlightMargin } from '../../components/atoms/slightMargin';
import { TextContainer } from '../../components/atoms/textContainer';
import { NavBar } from '../../components/organisms/navBar';
import { getJSON } from '../../utils/getJSON';
import { findFile } from '../../utils/files';

export default class extends Page {
  static async getInitialProps({req, query}) {
    const props = await super.getInitialProps({ req });
    const id = query.id;

    const response = await getJSON(`/api/visualization/get/${id}`, req);

    props.id = id;
    props.visualization = response.visualization;
    props.error = response.error;

    return props;
  }

  render() {
    const { error, visualization, user, csrfToken } = this.props;

    if (error) {
      return <Error statusCode={error.statusCode} />
    }

    const title = visualization.info.title;
    const width = 960;
    const height = 500;
    const html = findFile('index.html', visualization.content.files).text;

    return (
      <TitledPage title='View Visualization'>
        <TextContainer>
          <Runner html={html} width={width} height={height} />
          <SlightMargin>
            <h1 className='title test-document-title'>{title}</h1>
            <pre>
              { html }
            </pre>
          </SlightMargin>
        </TextContainer>
        <NavBar user={user} csrfToken={csrfToken} dropUp/>
      </TitledPage>
    );
  }
}
