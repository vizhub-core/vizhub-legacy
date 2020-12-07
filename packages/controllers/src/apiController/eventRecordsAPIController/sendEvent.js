import { SendEvent } from 'vizhub-use-cases';

export const sendEventController = (expressApp, gateways) => {
  const sendEvent = new SendEvent(gateways);
  expressApp.post('/api/event/send', async (req, res) => {
    try {
      const requestModel = { eventIDs: req.body.eventIDs, date: new Date() };
      const responseModel = await sendEvent.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({
        error: error.message,
      });
    }
  });
};
