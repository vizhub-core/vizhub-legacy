//import { sanitize } from 'dompurify';
import marked from 'marked';

const page = 'VizPage';
export const vizPagePresenter = ({ vizInfo }) => {
  const { title, description } = vizInfo;

  // TODO sanitize this
  // TODO allow iframes
  // TODO handle null for README
  //const sanitizedDescriptionHTML = sanitize(marked(description));
  const sanitizedDescriptionHTML = marked(description);

  const pageProps = { title, sanitizedDescriptionHTML };

  return { title, page, pageProps };
};
