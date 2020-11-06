import stripHtml from 'string-strip-html';
import sanitizeHTML from 'sanitize-html';

export const sanitize = (str) => sanitizeHTML(stripHtml(str));
