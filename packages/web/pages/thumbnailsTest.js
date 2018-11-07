import React from 'react';
import Page from '../components/page';
import { TitledPage } from '../components/atoms/titledPage';
import { VisualizationPreview } from '../components/atoms/visualizationPreview';
import { getJSON } from '../utils/getJSON';
import { testData } from 'datavis-tech-entities';

const { visualizationInfo } = testData;

// For testing long titles.
visualizationInfo.title = 'fdhsasjkf dhsasjkfl dhsasjk lfhda sdjklfh as djk has klhfjksd';

export default class extends Page {
  static async getInitialProps({req}) {
    const props = await super.getInitialProps({ req });
    props.metadata = await getJSON(`/api/visualization/metadata`, req);;
    return props;
  }
  render() {
    return (
      <TitledPage title='Thumbnails Test Page'>
        <h1>Preview</h1>
        <VisualizationPreview info={visualizationInfo} userName='thomas'/>
        {
          this.props.metadata.map(info => (
            <VisualizationPreview key={info.id} info={info} userName='undefined'/>
          ))
        }
      </TitledPage>
    );
  }
}
