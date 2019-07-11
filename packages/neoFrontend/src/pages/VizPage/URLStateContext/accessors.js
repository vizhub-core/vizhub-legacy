import queryString from 'query-string';

// Gets the value of a property in the location search query string.
const get = property => ({ location }) =>
  queryString.parse(location.search)[property];

// Sets the value of a property in the location search query string.
const set = property => ({ history, match, location }) => value => {
  const query = queryString.parse(location.search);
  query[property] = value;
  history.push({
    pathname: match.url,
    search: queryString.stringify(query)
  });
};

// A value of null means to show the editor.
// A value of undefined means to hide the editor.
// This behavior is inherited from query-string as the difference between
// '?edit' (null) and '' (undefined) as the location search string.
// If we used true and false here, we'd end up with verbose search strings like
// '?edit=true' and '?edit=false', which we don't want.
const getEdit = get('edit');
const setEdit = set('edit');

// A string file name value means to show the code editor with that file open.
// e.g. '?file=index.js' in location search string.
// A value of undefined means to hide the code editor.
// e.g. '' in location search string.
const getFile = get('file');
const setFile = set('file');

export const accessors = ({ history, match, location }) => ({
  edit: getEdit({ location }),
  setEdit: setEdit({ history, match, location }),
  file: getFile({ location }),
  setFile: setFile({ history, match, location })
});
