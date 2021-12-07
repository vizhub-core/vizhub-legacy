import { Container, Image } from 'react-bootstrap';
import { Navigation } from './Navigation';
import { VizPreview } from './VizPreview';
import { classed } from './classed';

const Wrapper = classed('profile-page');
const FullName = classed('profile-page-full-name');
const UserName = classed('profile-page-user-name');
const VizPreviewCollection = classed('viz-preview-collection');

export const ProfilePage = () => (
  <Wrapper>
    <Navigation />
    <Container className="mt-3 mb-3">
      <div className="d-flex mb-3">
        <Image
          className="profile-page-avatar me-3"
          src="https://github.com/mdo.png"
          roundedCircle
        />
        <div className="d-flex flex-column justify-content-center">
          <FullName>Full Name</div>
          <UserName>username</div>
        </div>
      </div>
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
