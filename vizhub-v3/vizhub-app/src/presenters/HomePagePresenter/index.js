import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from 'react';
import { VIZ_INFO_COLLECTION } from 'vizhub-interactors/constants';
import { HomePage, VizPreview } from '../../ui';
import { useShareDBConnection } from '../useShareDBConnection';
import { logShareDBError } from '../logShareDBError';
import { LogInWidgetPresenter } from '../LogInWidgetPresenter';
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
        href={'/ci/' + vizInfo.id}
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

  // Set to true to debug pagination visually.
  const debug = false;

  return (
    <HomePage
      renderVizPreviews={() => (
        <>
          <div className="viz-preview-collection">
            {vizInfosPages.map((vizInfos, pageIndex) =>
              vizInfos.map((vizInfo) => (
                <div
                  style={
                    debug
                      ? {
                          backgroundColor: pageIndex % 2 ? 'red' : 'green',
                          padding: '12px',
                        }
                      : {}
                  }
                >
                  <VizPreviewPresenter key={vizInfo.id} vizInfo={vizInfo} />
                </div>
              ))
            )}
          </div>
        </>
      )}
      renderLogInWigdet={() => (
        <LogInWidgetPresenter authenticatedUser={pageData.authenticatedUser} />
      )}
      requestNextPage={requestNextPage}
    />
  );
};
