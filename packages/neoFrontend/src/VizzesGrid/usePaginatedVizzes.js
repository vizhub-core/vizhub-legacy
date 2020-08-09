import {
  useEffect,
  useLayoutEffect,
  useCallback,
  useReducer,
  useRef,
} from 'react';

const initialState = {
  visualizationInfos: [],
  isFetchingNextPage: false,
  currentPage: 0,
  fetchedAllPages: false,
  usersById: {},
  error: null,
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
    const { visualizationInfos, ownerUsers } = action.data;

    const newUsersById = ownerUsers.reduce(
      (accumulator, user) => ({ ...accumulator, [user.id]: user }),
      {}
    );

    return {
      ...state,
      visualizationInfos: state.visualizationInfos.concat(visualizationInfos),
      isFetchingNextPage: false,
      fetchedAllPages: visualizationInfos.length === 0,
      usersById: { ...state.usersById, ...newUsersById },
    };
  case 'FETCH_NEXT_PAGE_FAILURE':
    return {
      error: action.data
    };
  default:
    throw new Error();
  }
}

const noop = () => {};

export const usePaginatedVizzes = (fetchData) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    visualizationInfos,
    isFetchingNextPage,
    currentPage,
    fetchedAllPages,
    usersById,
  } = state;

  const reset = useCallback(() => dispatch({ type: 'RESET' }), [dispatch]);

  // change current page should not cause reset since current page stay untouched
  useEffect(() => {
    reset();
  }, [fetchData, reset]);

  // Fetch the next page of visualizations.
  const fetchNextPage = useCallback(() => {
    dispatch({ type: 'FETCH_NEXT_PAGE_REQUEST' });
    fetchData(currentPage)
      .then((data) => {
        dispatch({ type: 'FETCH_NEXT_PAGE_SUCCESS', data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_NEXT_PAGE_FAILURE', data: error.message });
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
    visualizationInfos,
    paginate,
    usersById,
    isFetchingNextPage,
    reset,
  };
};
