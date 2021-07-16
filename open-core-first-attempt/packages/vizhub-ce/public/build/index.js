(function () {
  'use strict';

  const vizPageClientPlugin = () => ({
    foo: 'bar',
  });

  console.log('I am the client');
  console.log(vizPageClientPlugin());
  //import('./client2.js').then(({ message }) => {
  //  console.log(message);
  //});

}());
