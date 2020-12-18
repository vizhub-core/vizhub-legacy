export const sendEvent = (eventIDs) => {
  if (typeof eventIDs === 'string') {
    const values = eventIDs.split('.');
    eventIDs = values.reduce((accumulator, value, i) => {
      accumulator.push(`${values.slice(0, i + 1).join('.')}`);
      return accumulator;
    }, []);
  }
  // console.log('sendEvent: ' + JSON.stringify(eventIDs));
  fetch('/api/event/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventIDs }),
  });
};
