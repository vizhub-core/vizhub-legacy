import { useState, useEffect, useCallback } from 'react';
import { fetchHomePageData } from './fetchHomePageData';

export const useHomePageData = () => {
  const [homePageVisualizationInfos, setHomePageVisualizationInfos] = useState(
    []
  );
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchNextPage = useCallback(() => {
    const nextPage = currentPage + 1;
    setIsFetchingNextPage(true);
    fetchHomePageData(nextPage).then(data => {
      console.log(data);
      setHomePageVisualizationInfos(homePageVisualizationInfos.concat(data));
      setCurrentPage(nextPage);
      setIsFetchingNextPage(false);
    });
    setCurrentPage(nextPage);
  }, [currentPage, homePageVisualizationInfos]);

  // Fetch the first page of visualizations.
  useEffect(() => {
    if (currentPage === 0) {
      fetchNextPage();
    }
  }, [fetchNextPage, currentPage]);

  return homePageVisualizationInfos.length
    ? { homePageVisualizationInfos, fetchNextPage, isFetchingNextPage }
    : null;
};
