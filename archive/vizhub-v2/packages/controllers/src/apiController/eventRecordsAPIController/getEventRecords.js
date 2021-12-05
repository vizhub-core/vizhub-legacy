import { GetEventRecords } from 'vizhub-use-cases';

export const getEventRecordsController = (expressApp, gateways) => {
  const getEventRecords = new GetEventRecords(gateways);
  expressApp.post('/api/event/get', async (req, res) => {
    try {
      const requestModel = { eventIDs: req.body.eventIDs };
      const responseModel = await getEventRecords.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({
        error: error.message,
      });
    }
  });
};
