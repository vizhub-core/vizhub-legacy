import { CreateUser, GetUser } from 'vizhub-use-cases';

export const userController = userGateway => {
  const createUser = new CreateUser({ userGateway });
  const getUser = new GetUser({ userGateway });
  return {
    createUser: async (_, oAuthProfile) => {
      const requestModel = { oAuthProfile };
      const responseModel = await createUser.execute(requestModel);
      return responseModel.user;
    },
    getUser: async ({ id }) => {
      const requestModel = { id };
      const responseModel = await getUser.execute(requestModel);
      return responseModel.user;
    }
  };
};
