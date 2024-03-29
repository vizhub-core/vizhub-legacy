import React from 'react';
import { Container, Image } from './Bootstrap';
import { Layout } from './Layout';
import { VizPreview } from './VizPreview';

export const ProfilePage = () => (
  <Layout className="profile-page">
    <Navigation />
    <Container className="mt-3 mb-3">
      <div className="d-flex mb-3">
        <Image
          className="profile-page__avatar me-3"
          src="https://github.com/mdo.png"
          roundedCircle
        />
        <div className="d-flex flex-column justify-content-center">
          <div className="profile-page__full-name">Full Name</div>
          <div className="profile-page__user-name">username</div>
        </div>
      </div>
      <div className="viz-preview-collection">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((d) => (
          <VizPreview
            title="Viz Title"
            thumbnailImageURL="https://vizhub.com/api/visualization/thumbnail/76631818791a48909d79d6562177e4dc.png"
            lastUpdatedDateFormatted="December 6, 2021"
            ownerName="Joe Schmo"
            ownerAvatarURL="https://github.com/mdo.png"
          />
        ))}
      </div>
    </Container>
  </Layout>
);
