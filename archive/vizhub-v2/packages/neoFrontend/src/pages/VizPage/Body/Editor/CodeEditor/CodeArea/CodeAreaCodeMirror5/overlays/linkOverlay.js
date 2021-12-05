// inspired by https://stackoverflow.com/a/19865112/5155388
const multilineRegex = (tmpl) => {
  let [, source, flags] = tmpl
    .replace(/\s*(\/\/.*)?$\s*/gm, '') // remove comments and spaces at both ends of lines
    .match(/^\/?(.*?)(?:\/(\w+))?$/); // extracts source and flags

  return new RegExp(source, flags);
};

// inspired by https://daringfireball.net/2010/07/improved_regex_for_matching_urls
const urlRegex = `
/(                           // Capture 1: entire matched URL
  (?:
    (http|https):                // URL protocol and colon
    (?:
      /{1,3}                        // 1-3 slashes
      |                             //   or
      [a-z0-9%]                     // Single letter or digit or '%'
                                    // (Trying not to match e.g. "URI::Escape")
    )
    |                            //   or
    www\\d{0,3}[.]               // "www.", "www1.", "www2." … "www999."
    |                            //   or
    [a-z0-9.\\-]+[.][a-z]{2,4}/  // looks like domain name followed by a slash
  )
  (?:                            // One or more:
    [^\\s()<>]+                      // Run of non-space, non-()<>
    |                                //   or
    \\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\)  // balanced parens, up to 2 levels
  )+
  (?:                            // End with:
    \\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\)  // balanced parens, up to 2 levels
    |                                         //   or
    [^\\s!()\\[\\]{};:'"\`.,<>?«»“”‘’]        // not a space or one of these punct chars
  )
)/g
`;

export const linkOverlay = {
  token: (stream) => {
    const matchRegex = multilineRegex(urlRegex);
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
