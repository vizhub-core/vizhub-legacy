//import { sanitize } from 'dompurify';
import marked from 'marked';

const page = 'VizPage';
export const vizPagePresenter = ({ vizInfo }) => {
  const { id, title, description } = vizInfo;

  // TODO sanitize this
  // TODO allow iframes after sanitization
  // TODO handle null for README (defensive just to prevent crashes)
  //const sanitizedDescriptionHTML = sanitize(marked(description));
  const sanitizedDescriptionHTML = marked(description);

  const previewUrl = `https://vizhub.com/api/visualization/preview/${id}.png`;

  const pageProps = { title, sanitizedDescriptionHTML, previewUrl };
  // TODO add meta tag info
  return { title, page, pageProps };
};
