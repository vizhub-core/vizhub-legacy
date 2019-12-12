import {
  useEffect,
  useLayoutEffect,
  useCallback,
  useReducer,
  useRef
} from 'react';
import { fetchHomePageData } from './fetchHomePageData';

const initialState = {
  homePageVisualizationInfos: [],
  isFetchingNextPage: false,
  currentPage: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_NEXT_PAGE_REQUEST':
      return {
        ...state,
        isFetchingNextPage: true,
        currentPage: state.currentPage + 1
      };
    case 'FETCH_NEXT_PAGE_SUCCESS':
      const { visualizationInfos, ownerUsers } = action.data;
      console.log(ownerUsers);
      return {
        ...state,
        homePageVisualizationInfos: state.homePageVisualizationInfos.concat(
          visualizationInfos
        ),
        isFetchingNextPage: false
      };
    default:
      throw new Error();
  }
}

const noop = () => {};

export const useHomePageData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { homePageVisualizationInfos, isFetchingNextPage, currentPage } = state;

  // Fetch the next page of visualizations.
  const fetchNextPage = useCallback(() => {
    dispatch({ type: 'FETCH_NEXT_PAGE_REQUEST' });
    console.log('fetching page ' + currentPage);
    fetchHomePageData(currentPage).then(data => {
      dispatch({ type: 'FETCH_NEXT_PAGE_SUCCESS', data });
    });
  }, [currentPage]);

  // Fetch the first page of visualizations.
  useEffect(() => {
    if (currentPage === 0) {
      fetchNextPage();
    }
  }, [fetchNextPage, currentPage]);

  const paginate = useRef(noop);

  useLayoutEffect(() => {
    paginate.current = isFetchingNextPage ? noop : fetchNextPage;
  }, [isFetchingNextPage, fetchNextPage]);

  return { homePageVisualizationInfos, paginate };
};
