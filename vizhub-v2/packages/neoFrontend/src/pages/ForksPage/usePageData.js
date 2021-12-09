import {
  useEffect,
  useLayoutEffect,
  useCallback,
  useReducer,
  useRef,
} from 'react';
import { useParams } from 'react-router';
import { fetchPageData } from './fetchPageData';

const initialState = {
  visualizationInfos: [],
  isFetchingNextPage: false,
  currentPage: 0,
  fetchedAllPages: false,
  usersById: {},
  error: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return initialState;
    case 'FETCH_NEXT_PAGE_REQUEST':
      return {
        ...state,
        isFetchingNextPage: true,
        currentPage: state.currentPage + 1,
      };
    case 'FETCH_NEXT_PAGE_SUCCESS':
      const { visualizationInfo, visualizationInfos, ownerUsers } = action.data;

      const newUsersById = ownerUsers.reduce(
        (accumulator, user) => ({ ...accumulator, [user.id]: user }),
        {}
      );

      return {
        ...state,
        visualizationInfo: { ...state.visualizationInfo, ...visualizationInfo },
        visualizationInfos: state.visualizationInfos.concat(visualizationInfos),
        isFetchingNextPage: false,
        fetchedAllPages: visualizationInfos.length === 0,
        usersById: { ...state.usersById, ...newUsersById },
      };
    case 'FETCH_NEXT_PAGE_FAILURE':
      return {
        ...state,
        error: action.error,
      };
    default:
      throw new Error();
  }
}

const noop = () => {};

export const usePageData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    visualizationInfo,
    visualizationInfos,
    isFetchingNextPage,
    currentPage,
    fetchedAllPages,
    usersById,
    error,
  } = state;
  const { vizId } = useParams();

  const reset = useCallback(() => dispatch({ type: 'RESET' }), [dispatch]);

  const fetchData = useCallback((offset) => fetchPageData(vizId, offset), [
    vizId,
  ]);

  // change current page should not cause reset since current page stay untouched
  useEffect(() => {
    reset();
  }, [fetchData, reset]);

  // Fetch the next page of visualizations.
  const fetchNextPage = useCallback(() => {
    dispatch({ type: 'FETCH_NEXT_PAGE_REQUEST' });
    fetchData(currentPage).then((data) => {
      if (data && data.visualizationInfo && data.visualizationInfo.error) {
        dispatch({
          type: 'FETCH_NEXT_PAGE_FAILURE',
          error: data.visualizationInfo.error,
        });
      } else {
        dispatch({ type: 'FETCH_NEXT_PAGE_SUCCESS', data });
      }
    });
  }, [currentPage, fetchData]);

  // Fetch the first page of visualizations.
  useEffect(() => {
    if (currentPage === 0) {
      fetchNextPage();
    }
  }, [fetchNextPage, currentPage]);

  const paginate = useRef(noop);

  useLayoutEffect(() => {
    paginate.current =
      isFetchingNextPage || fetchedAllPages ? noop : fetchNextPage;
  }, [isFetchingNextPage, fetchNextPage, fetchedAllPages]);

  return {
    visualizationInfo,
    visualizationInfos,
    paginate,
    usersById,
    isFetchingNextPage,
    reset,
    error,
  };
};
