//import { sanitize } from 'dompurify';
import marked from 'marked';

const page = 'VizPage';
export const vizPagePresenter = ({ vizInfo }) => {
  const { title, description } = vizInfo;

  // TODO sanitize this
  // TODO allow iframes after sanitization
  // TODO handle null for README (defensive just to prevent crashes)
  //const sanitizedDescriptionHTML = sanitize(marked(description));
  const sanitizedDescriptionHTML = marked(description);

  const pageProps = { title, sanitizedDescriptionHTML };

  // TODO add meta tag info
  return { title, page, pageProps };
};
