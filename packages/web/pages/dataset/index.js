import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { VisualizationRunner } from 'vizhub-ui';
import { VisualizationViewModel } from 'datavis-tech-presenters';
import Page from '../../components/page';
import { TitledPage } from '../../components/atoms/titledPage';
import { SlightMargin } from '../../components/atoms/slightMargin';
import { TextContainer } from '../../components/atoms/textContainer';
import { NavBar } from '../../components/organisms/navBar';
import { getJSON } from '../../utils/getJSON';

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

    const { title, files, width, height } = new VisualizationViewModel(visualization);

    return (
      <TitledPage title={title}>
        <TextContainer>
          <VisualizationRunner {...{files, width, height}} />
          <SlightMargin>
            <h1 className='title test-document-title'>{title}</h1>
            {
              files.map(file => (
                <React.Fragment key={file.name}>
                  <div>{ file.name }</div>
                  <pre>{ file.text }</pre>
                </React.Fragment>
              ))
            }
          </SlightMargin>
        </TextContainer>
        <NavBar user={user} csrfToken={csrfToken} dropUp/>
      </TitledPage>
    );
  }
}
