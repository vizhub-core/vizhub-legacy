console.log('I am the client');
import('client2.js').then(({ message }) => {
  console.log(message);
});
