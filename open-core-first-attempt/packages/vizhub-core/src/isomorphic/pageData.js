// These functions are responsible for safely transporting page data
// from the server, via a string in HTML to the client rendered app.

export const encodePageData = (pageData) =>
  btoa(encodeURIComponent(JSON.stringify(pageData)));

export const decodePageData = (encodedPageData) =>
  JSON.parse(decodeURIComponent(atob(encodedPageData)));
