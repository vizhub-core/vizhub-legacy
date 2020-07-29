const urlRegex = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s"]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s"]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s"]{2,}|www\.[a-zA-Z0-9]+\.[^\s"]{2,}/g;

export const linkOverlay = {
  token: (stream) => {
    const matchRegex = RegExp(urlRegex);
    matchRegex.lastIndex = stream.pos;

    var match = matchRegex.exec(stream.string);
    if (match && match.index === stream.pos) {
      stream.pos += match[0].length || 1;
      return 'link';
    } else if (match) {
      stream.pos = match.index;
    } else {
      stream.skipToEnd();
    }
  },
};
