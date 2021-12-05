export const reducer = (state, action) => {
  switch (action.type) {
    case 'request':
      return Object.assign({}, state, {
        [action.vizId]: {
          isFetching: true
        }
      });
    case 'receive':
      return Object.assign({}, state, {
        [action.vizId]: {
          isFetching: false,
          studioData: action.studioData
        }
      });
    default:
      throw new Error();
  }
};
