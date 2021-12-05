import { GetUsers } from 'vizhub-use-cases';

export const getUsersController = (expressApp, gateways) => {
  const getUsers = new GetUsers(gateways);
  expressApp.get('/api/user/get', async (req, res) => {
    try {
      const ids = req.query.ids.split(',');
      const data = await getUsers.execute({ ids });
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
