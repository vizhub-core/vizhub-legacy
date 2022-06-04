// This module is the top level API and is responsible for
//  * managing the iframe `srcdoc`
//  * sending and receiving messages from the iframe
//  * invoking `build()` when files are changed

// This function ensures that the iframe `srcdoc` JS has
// fully executed, which is important because only after
// it has fully executed is it ready to receive messages
// that update its JS, CSS, or configuration.
//
// What if this constructor runs before the srcdoc has been fully evaluated?
// Sometimes srcdoc execution will be blocked on CDN network requests.
// Solvable using some sort of initialization handshake?
const initialize = (iframe) =>
  new Promise((resolve, reject) => {
    // Hey iframe, if you tell me you executed all your JS,
    // I will hear you.
    const onMessage = ({ data }) => {
      if (data.type === 'initialized') {
        window.removeEventListener('message', onMessage);
        resolve();
      }
    };
    window.addEventListener('message', onMessage);

    // Hey iframe, did you execute all your JS yet?
    //  * If so, I'll proceed
    //  * If not, I'll wait until you do
    //    TODO test both cases
    iframe.contentWindow.postMessage({ type: 'initializedCheck' }, '*');

    // Oh and by the way, I know that if you haven't executed
    // all your JS yet, even though you won't receive my message,
    // you'll kindly let me know when you do execute all your JS
    // by sending the 'initialized' message.
  });

// Assumptions:
//  * The `iframe` that is passed into this constructor
//    already has its `srcdoc` attribute set to the returned
//    value from `generateSrcdoc`. This is to enable SSR of `srcdoc`,
//    so that the viz can start running _before_ the JS for the VizHub
//    runtime has even loaded on the page.
//  * The `srcdoc` may or may not have fully executed at the
//    time this constructor is invoked.
export const Runner = async (iframe) => {
  // Guarantee that the iframe `srcdoc` JS has fully executed,
  // and is ready to receive messages.
  await initialize(iframe);

  const run = ({ code }) => {
    iframe.contentWindow.postMessage({ type: 'runJS', code }, '*');
  };

  return { run };
};
