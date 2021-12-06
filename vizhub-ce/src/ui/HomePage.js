import { Container } from 'react-bootstrap';
import { Navigation } from './Navigation';
import { VizPreview } from './VizPreview';
import { classed } from './classed';

const VizPreviewCollection = classed('viz-preview-collection');

export const HomePage = () => (
  <>
    <Navigation />
    <Container className="mt-3">
      <VizPreviewCollection>
        <VizPreview
          title="Viz Title"
          thumbnailImageURL="https://vizhub.com/api/visualization/thumbnail/76631818791a48909d79d6562177e4dc.png"
          lastUpdatedDateFormatted="December 6, 2021"
          ownerName="Joe Schmo"
          ownerAvatarURL="https://avatars.githubusercontent.com/u/5771747?v=4&s=180"
        />
      </VizPreviewCollection>
    </Container>
  </>
);
