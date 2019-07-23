import { useMemo } from 'react';
import queryString from 'query-string';

// Gets the value of a property in the location search query string.
const get = property => ({ location }) =>
  queryString.parse(location.search)[property];

// Sets the value of a property in the location search query string.
const set = property => ({ history, match }) => value => {

  // Use the mutable history.location here so that we can
  // call "set" multiple times synchronously for different properties.
  // For example, when entering mini mode, simultaneously setting the
  // values for the "edit" and "file" params if required.
  const query = queryString.parse(history.location.search);
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

// A string file name value means to show the editor with that file open.
// e.g. '?file=index.js' in location search string.
//
//  * "full" = Full screen mode
//  * "mini" = Mini mode
//  * "hide" = Don't show viz at all
//  * undefined = Normal view mode
const getMode = get('mode');
const setMode = set('mode');

export const useAccessors = props =>
  useMemo(
    () => ({
      edit: getEdit(props),
      setEdit: setEdit(props),
      file: getFile(props),
      setFile: setFile(props),
      mode: getMode(props),
      setMode: setMode(props)
    }),
    [props]
  );
