(function (React) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  // These functions are responsible for safely transporting page data

  const decodePageData = (encodedPageData) =>
    JSON.parse(decodeURIComponent(atob(encodedPageData)));

  console.log('I am the client');

  console.log(decodePageData(window.pageData));
  console.log(React__default['default']);

  //import('./client2.js').then(({ message }) => {
  //  console.log(message);
  //});

}(React));
