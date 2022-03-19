import React from 'react';
import { Container } from './Bootstrap';
import { Navigation } from './Navigation';
import { VizPreview } from './VizPreview';

export const HomePage = ({ vizPreviewsProps }) => (
  <div className="overflow-auto">
    <Navigation />
    <Container className="mt-3 mb-3">
      <div className="viz-preview-collection">
        {vizPreviewsProps.map((props) => (
          <VizPreview key={props.id} {...props} />
        ))}
      </div>
    </Container>
  </div>
);
