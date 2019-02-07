import marked from 'marked';
import { merge } from 'rxjs';
import { debounceTime, map, filter } from 'rxjs/operators';
import { CHANGE_FILE_TEXT, INIT_FILES } from '../actionTypes';
import { setDescription } from '../actionCreators';
import { runDebounceTime } from '../../constants';
import { getFile } from '../selectors';

const responsiveYouTube = html => html
  .replace(/<iframe(.+)youtube(.+)<\/iframe>/g, match =>
    `<div class='responsive-youtube'>${match}</div>`
  );

const renderMarkdown = markdownFile =>
  markdownFile
    ? responsiveYouTube(marked(markdownFile.text))
    : '';

export const updateDescriptionEpic = (action$, state$) =>
  merge(
    action$.ofType(INIT_FILES),
    action$.ofType(CHANGE_FILE_TEXT).pipe(
      filter(action => action.fileName === 'README.md'),
      debounceTime(runDebounceTime)
    ),
  )
  .pipe(
    map(action => (
      setDescription(renderMarkdown(getFile(state$.value, 'README.md')))
    ))
  );
