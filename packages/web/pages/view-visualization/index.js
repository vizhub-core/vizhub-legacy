import fetch from 'isomorphic-fetch'
import Error from 'next/error'
import Page from '../../components/page'
import { TitledPage } from '../../components/atoms/titledPage'
import { Runner } from '../../components/atoms/runner'
import { SlightMargin } from '../../components/atoms/slightMargin'
import { TextContainer } from '../../components/atoms/textContainer'
import { NavBar } from '../../components/organisms/navBar'

export default class extends Page {
  static async getInitialProps({req, res, query}) {
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

  render() {
    const { error, visualization, user, id, csrfToken } = this.props;

    const visualizationPresentation = visualization
      ? {
        html: visualization.content.files['index.html'],
        title: visualization.info.title,
        width: 809, // visualization.info.width,
        height: 500 // visualization.info.height
      }
      : {}

    const {
      html,
      title,
      width,
      height
    } = visualizationPresentation;

    return error
      ? <Error statusCode={error.statusCode} />
      : (
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
