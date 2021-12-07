import { Container, Image } from 'react-bootstrap';
import { Navigation } from './Navigation';
import { VizPreview } from './VizPreview';
import { classed } from './classed';

const Wrapper = classed('profile-page');
const VizPreviewCollection = classed('viz-preview-collection');

export const ProfilePage = () => (
  <Wrapper>
    <Navigation />
    <Container className="mt-3 mb-3">
      <Image className="profile-avatar" src="https://github.com/mdo.png" roundedCircle />
      <VizPreviewCollection>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((d) => (
          <VizPreview
            title="Viz Title"
            thumbnailImageURL="https://vizhub.com/api/visualization/thumbnail/76631818791a48909d79d6562177e4dc.png"
            lastUpdatedDateFormatted="December 6, 2021"
            ownerName="Joe Schmo"
            ownerAvatarURL="https://github.com/mdo.png"
          />
        ))}
      </VizPreviewCollection>
    </Container>
  </Wrapper>
);
