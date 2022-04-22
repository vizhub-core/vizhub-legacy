import React, { useMemo } from 'react';
import { Container, Button } from './Bootstrap';
import { Layout } from './Layout';
import { Navigation } from './Navigation';
import { VizPreview } from './VizPreview';

export const HomePage = ({
  renderVizPreviews,
  requestNextPage,
  renderLogInWigdet,
}) => {
  return (
    <Layout className="home-page">
      <Navigation renderLogInWigdet={renderLogInWigdet} />
      <Container className="mt-3 mb-3">
        {renderVizPreviews()}
        <div className="mt-3 mb-3 d-flex justify-content-center">
          <Button onClick={requestNextPage}>More</Button>
        </div>
      </Container>
    </Layout>
  );
};
