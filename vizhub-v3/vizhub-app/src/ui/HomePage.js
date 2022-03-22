import React, { useMemo } from 'react';
import { Container } from './Bootstrap';
import { Navigation } from './Navigation';
import { VizPreview } from './VizPreview';

export const HomePage = ({ renderVizPreviews, onScrollToBottom }) => {
  //TODO fire onScrollToBottom when the user scrolls to the bottom,
  // to request the next page of the query.

  return (
    <div className="overflow-auto">
      <Navigation />
      <Container className="mt-3 mb-3">
        <div className="viz-preview-collection">{renderVizPreviews()}</div>
      </Container>
    </div>
  );
};
