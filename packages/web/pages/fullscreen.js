import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Head from 'next/head';
import { Fragment } from 'react';
import { VisualizationFullscreen, FullPage, uiRedux } from 'vizhub-ui';
import { VisualizationViewModel } from 'datavis-tech-presenters';
import Page from '../components/page';
import { TitledPage } from '../components/atoms/titledPage';
import { getJSON } from '../utils/getJSON';
import { previewUrl, visualizationRoute, absolute } from '../routes/routeGenerators';
import 'vizhub-ui/dist/styles.css';

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
    return props;
  }

  constructor(props) {
    super(props);
    if (props.error) {
      return;
    }
  }

  render() {
    const { error, user, csrfToken, visualization, ownerUser } = this.props;
    
    if (error) {
      return <Error statusCode={error.statusCode} />
    }

    const {
      title,
      files,
      width,
      height
    } = new VisualizationViewModel(visualization);

    return (
      <React.Fragment>
        <TitledPage title={title} disableCommentLink={true}>
          <FullPage>
            <VisualizationFullscreen
              width={width}
              height={height}
              files={files}
            />
          </FullPage>
        </TitledPage>
      </React.Fragment>
    );
  }
}
