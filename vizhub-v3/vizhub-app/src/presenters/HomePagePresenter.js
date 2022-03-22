import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from 'react';
import { VIZ_INFO_COLLECTION } from 'vizhub-interactors/constants';
import { HomePage, VizPreview } from '../ui';
import { useShareDBConnection } from './useShareDBConnection';
import { logShareDBError } from './logShareDBError';
import { useVizInfos } from './useVizInfos';

// Only re-render a given VizPreview when its corresponding vizInfo changes.
const VizPreviewPresenter = ({ vizInfo }) =>
  useMemo(
    () => (
      <VizPreview
        id={vizInfo.id}
        title={vizInfo.title}
        thumbnailImageURL={
          'https://vizhub.com/api/visualization/thumbnail/76631818791a48909d79d6562177e4dc.png'
        }
        lastUpdatedDateFormatted={'December 6, 2021'}
        ownerName={'Joe Schmo'}
        ownerAvatarURL={'https://github.com/mdo.png'}
      />
    ),
    [vizInfo]
  );

export const HomePagePresenter = ({ pageData }) => {
  // Initialize the ShareDB connection via WebSocket.
  const shareDBConnection = useShareDBConnection();

  const { vizInfosPages, requestNextPage } = useVizInfos({
    pageData,
    shareDBConnection,
  });

  // TODO consider optimizing this by just passing in vizInfos.
  // Currently this creates a new object for each vizInfo,
  // even when just a single field on a single vizInfo changes,
  // causing each and ever VizPreview to be re-rendered.

  //

  // TODO Simulate user scrolling.
  // useEffect(() => {
  //   requestNextPage();
  // });

  // Working
  //  return vizInfos.map(({ id, title }) => (
  //    <a key={id} href={`testUser/${id}`}>
  //      {title}
  //    </a>
  //  ));

  return (
    <HomePage
      renderVizPreviews={() => (
        <>
          {vizInfosPages.map((vizInfos) =>
            vizInfos.map((vizInfo) => (
              <VizPreviewPresenter key={vizInfo.id} vizInfo={vizInfo} />
            ))
          )}
        </>
      )}
      onScrollToBottom={requestNextPage}
    />
  );
};
