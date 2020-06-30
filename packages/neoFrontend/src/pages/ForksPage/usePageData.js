import { useCallback, useState, useEffect } from 'react';
import { waitForSpinner } from '../../LoadingScreen';
import { useParams } from 'react-router';
import { usePageData as useVizzesGridPageData } from '../../VizzesGrid/usePageData';
import { fetchPageData, fetchVizPageData } from './fetchPageData';

export const usePageData = () => {
  let { vizId } = useParams();

  const forksData = useCallback((offset) => fetchPageData(vizId, offset), [
    vizId,
  ]);

  return useVizzesGridPageData(forksData);
};

export const useVizData = () => {
  const [data, setData] = useState(undefined);

  let { vizId } = useParams();

  useEffect(() => {
    setData(undefined);

    const dataLoaded = fetchVizPageData(vizId);

    waitForSpinner(dataLoaded).then(setData);
  }, [vizId]);

  return data;
};
