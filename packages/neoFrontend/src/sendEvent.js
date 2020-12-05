export const sendEvent = async (eventIDs) => {
  console.log('sending event');
  console.log(eventIDs);
  const response = await fetch('/api/event/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eventIDs }),
  });
  console.log(response);
};
