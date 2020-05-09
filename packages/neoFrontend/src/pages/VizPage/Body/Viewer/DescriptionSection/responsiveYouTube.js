// Wraps YouTube embeds in a styled wrapper,
// so that the embed resizes nicely,
// preserving aspect ratio.
export const responsiveYouTube = (html) =>
  html.replace(
    /<iframe(.+)youtube(.+)<\/iframe>/g,
    (match) => `<div class='responsive-youtube'>${match}</div>`
  );
