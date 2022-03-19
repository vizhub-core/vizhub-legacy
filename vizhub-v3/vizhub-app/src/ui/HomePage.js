import React, { useMemo } from 'react';
import { Container } from './Bootstrap';
import { Navigation } from './Navigation';
import { VizPreview } from './VizPreview';

// Only re-render a given VizPreview when its corresponding vizInfo changes.
const VizPreviewWrapper = ({ vizPreviewItem, vizPreviewProps }) =>
  useMemo(
    () => <VizPreview {...vizPreviewProps(vizPreviewItem)} />,
    [vizPreviewItem, vizPreviewProps]
  );

// Regarging vizPreviewItems, vizPreviewProps, vizPreviewKey:
//
//   The idea behind this approach is to keep this UI component strictly ignorant
//   of the VizInfo entity, while also being performant and optimizable with `useMemo`.
//   To this end, we delegate translation of VizInfo entity objects into React keys
//   and props to functions defined externally to this UI component.
//
//   The only things this component understands about `vizPreviewItems`:
//
//    * It is an array that should map to the <VizPreview/> component.
//    * Each item has a React key that can be derifed from `vizPreviewKey(item)`.
//    * The props for VizPreview can be derived from `vizPreviewProps(item)`.
//
//   This approach strikes a balance between keeping this component "dumb",
//   but also performant (optimized with `useMemo`).
export const HomePage = ({
  vizPreviewItems,
  vizPreviewProps,
  vizPreviewKey,
  onScrollToBottom,
}) => {
  //TODO fire onScrollToBottom when the user scrolls to the bottom,
  // to request the next page of the query.

  return (
    <div className="overflow-auto">
      <Navigation />
      <Container className="mt-3 mb-3">
        <div className="viz-preview-collection">
          {useMemo(
            () =>
              vizPreviewItems.map((vizPreviewItem) => (
                <VizPreviewWrapper
                  key={vizPreviewKey(vizPreviewItem)}
                  vizPreviewItem={vizPreviewItem}
                  vizPreviewProps={vizPreviewProps}
                />
              )),
            [vizPreviewItems]
          )}
        </div>
      </Container>
    </div>
  );
};
