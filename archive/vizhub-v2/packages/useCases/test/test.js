import assert from 'assert';
import { i18n } from 'vizhub-i18n';
import { ciUser, testData, timestamp } from 'vizhub-entities';

import {
  CreateVisualization,
  GetVisualization,
  ExportVisualization,
  SaveVisualization,
  CreateDataset,
  GetDataset,
  ForkVisualization,
  CreateUser,
  GetUser,
  GetOrCreateUser,
  GetUserProfileData,
  GetAllVisualizationInfos,
  DeleteVisualization,
  UpdateImages,
} from '../src/index';

const visualizationGateway = {
  createVisualization: async (options) => {
    const { id } = options;
    options.info = options;
    options.content = options;
    visualizationGateway[id] = options;
    return { id };
  },
  getVisualization: async ({ id }) => visualizationGateway[id],
  getVisualizationInfo: async ({ id }) => visualizationGateway[id].info,
};

const datasetGateway = {};

const fakeUser = {
  authenticated: undefined,
  id: '84752',
  userName: 'joe',
  fullName: 'Joe Schmoe',
  email: 'joe@datavis.tech',
  avatarUrl: 'https://avatars3.githubusercontent.com/u/84752?v=4',
  company: 'Schmoe INC',
  website: 'joeschmoe.com',
  location: 'Earth',
  bio: 'Great guy',
  plan: undefined,
  stripeCustomerId: undefined,
};

describe('Use Cases', () => {
  let visualizationId;

  describe('Create Visualization', () => {
    const createVisualization = new CreateVisualization({
      visualizationGateway,
    });
    it('should error if no owner specified.', (done) => {
      const requestModel = { owner: null };
      createVisualization.execute(requestModel).catch((error) => {
        assert.equal(error.message, i18n('errorNoOwner'));
        done();
      });
    });
    it('should return an id if success.', async () => {
      const requestModel = {
        owner: testData.user.id,
      };
      const responseModel = await createVisualization.execute(requestModel);
      assert.equal(responseModel.id.length, 32);
      visualizationId = responseModel.id;
    });
  });

  describe('Get Visualization', () => {
    const userGateway = { getUser: async (id) => fakeUser };
    const getVisualization = new GetVisualization({
      visualizationGateway,
      userGateway,
    });
    it('should error if no id specified.', (done) => {
      getVisualization.execute({ id: null }).catch((error) => {
        assert.equal(error.message, i18n('errorNoId'));
        done();
      });
    });
    it('should return stored visualization if success.', async () => {
      const { visualization } = await getVisualization.execute({
        id: visualizationId,
      });
      const { createdTimestamp, lastUpdatedTimestamp } = visualization;

      assert(timestamp() - createdTimestamp < 1);
      assert(timestamp() - lastUpdatedTimestamp < 1);
    });
    it('should return owner user.', async () => {
      const { ownerUser } = await getVisualization.execute({
        id: visualizationId,
      });
      assert.deepEqual(ownerUser, fakeUser);
    });
    it('should return forked from visualizationInfo as undefined if none exist.', async () => {
      const { forkedFromVisualizationInfo } = await getVisualization.execute({
        id: visualizationId,
      });
      assert.equal(forkedFromVisualizationInfo, undefined);
    });
  });

  let visualizationToFork;
  let forkedViz;
  describe('Fork Visualization', () => {
    let invocations = 0;

    const userGateway = {
      getUser: async (id) => fakeUser,
    };

    const visualizationGatewayProxy = {
      createVisualization: async (argument) => {
        forkedViz = argument;
        invocations++;
        return await visualizationGateway.createVisualization(argument);
      },
      saveVisualization: () => {},
      incrementForksCount: () => {},
    };

    const getVisualization = new GetVisualization({
      visualizationGateway,
      userGateway,
    });

    const forkVisualization = new ForkVisualization({
      visualizationGateway: visualizationGatewayProxy,
      userGateway,
    });

    it('should return stored visualization to fork.', async () => {
      const { visualization } = await getVisualization.execute({
        id: visualizationId,
      });
      visualizationToFork = visualization;
    });

    it('should error if no owner specified.', (done) => {
      const requestModel = {
        visualization: visualizationToFork,
        owner: null,
      };
      forkVisualization.execute(requestModel).catch((error) => {
        assert.equal(error.message, i18n('errorNoOwner'));
        assert.equal(invocations, 0);
        done();
      });
    });

    it('should invoke gateway if owner specified.', async () => {
      const requestModel = {
        visualization: visualizationToFork,
        owner: '456',
      };

      const responseModel = await forkVisualization.execute(requestModel);
      assert.equal(responseModel.userName, 'joe');

      assert.equal(invocations, 1);

      assert(timestamp() - forkedViz.createdTimestamp < 1);
      assert(timestamp() - forkedViz.lastUpdatedTimestamp < 1);

      assert.equal(forkedViz.owner, '456');
      assert.equal(forkedViz.title, visualizationToFork.title);
      assert.equal(forkedViz.description, visualizationToFork.description);
      assert.equal(forkedViz.files, visualizationToFork.files);
      assert.equal(forkedViz.forkedFrom, visualizationToFork.id);
      assert.equal(forkedViz.height, visualizationToFork.height);
    });
  });

  describe('Get Visualization after Forking', () => {
    it('should include forkedFromVisualizationInfo.', async () => {
      const getVisualization = new GetVisualization({
        visualizationGateway,
        userGateway: { getUser: () => {} },
      });

      const { forkedFromVisualizationInfo } = await getVisualization.execute({
        id: forkedViz.id,
      });

      assert.deepEqual(forkedFromVisualizationInfo, visualizationToFork.info);

      //const { visualization } = await getVisualization.execute({ id: visualizationId });
      // const { forkedFromVisualizationInfo } = await getVisualization.execute({ id: forkedViz.id });
    });

    // it('should return forked from visualizationInfo.', async () => {
    //   const { visualization } = await getVisualization.execute({ id: visualizationId });
    //   console.log(visualization);
    //   const { forkedFromVisualizationInfo } = await getVisualization.execute({ id: forkedViz.id });
    //   assert.deepEqual(forkedFromVisualizationInfo, visualization.info);
    // });
  });

  const createUserRequestModel = {
    oAuthProfile: {
      id: '84752',
      displayName: 'Joe Schmoe',
      username: 'joe',
      avatar_url: 'https://avatars3.githubusercontent.com/u/84752?v=4',
      email: 'joe@datavis.tech',
      _json: {
        name: 'Joe Schmoe',
        company: 'Schmoe INC',
        blog: 'joeschmoe.com',
        location: 'Earth',
        bio: 'Great guy',
      },
    },
  };

  describe('Create User', () => {
    const userGateway = { createUser: async (user) => user };
    const createUser = new CreateUser({ userGateway });

    it('should invoke gateway with user instance', async () => {
      const responseModel = await createUser.execute(createUserRequestModel);
      assert.deepEqual(responseModel, { user: fakeUser });
    });
  });

  describe('Get User', () => {
    const userGateway = { getUser: async (id) => fakeUser };
    const getUser = new GetUser({ userGateway });

    it('should invoke gateway with user instance', async () => {
      const requestModel = { id: '84752' };
      const responseModel = await getUser.execute(requestModel);
      assert.deepEqual(responseModel, { user: fakeUser });
    });

    it('should return ci user for ci user id', async () => {
      const requestModel = { id: ciUser.id };
      const responseModel = await getUser.execute(requestModel);
      assert.deepEqual(responseModel, { user: ciUser });
    });
  });

  describe('Get or Create User', () => {
    let user;

    it('should create user if not found', async () => {
      let createCalled = false;
      const userGateway = {
        getUserByEmailOrId: () => null,
        createUser: async (user) => {
          createCalled = true;
          return user;
        },
      };

      const getOrCreateUser = new GetOrCreateUser({ userGateway });
      const responseModel = await getOrCreateUser.execute(
        createUserRequestModel
      );
      user = responseModel.user;
      assert.equal(user.userName, createUserRequestModel.oAuthProfile.username);
      assert(createCalled);
    });

    it('should return user if found', async () => {
      let createCalled = false;
      let saveCalled = false;
      const userGateway = {
        getUserByEmailOrId: () => user,
        createUser: async (user) => {
          createCalled = true;
          return user;
        },
        saveUser: async (user) => {
          saveCalled = true;
          return user;
        },
      };

      const getOrCreateUser = new GetOrCreateUser({ userGateway });
      const responseModel = await getOrCreateUser.execute(
        createUserRequestModel
      );
      assert.deepEqual(responseModel.user, user);
      assert(!createCalled);
      assert(saveCalled);
    });
  });

  describe('Get User Profile Data', () => {
    const fakeVisualizationInfos = [
      { owner: fakeUser.id, title: 'Foo', description: 'Foo is cool' },
      { owner: fakeUser.id, title: 'Bar', description: 'Bar is great' },
    ];
    const fakeDatasetInfos = [
      { owner: fakeUser.id, title: 'Foo', description: 'Foo is cool' },
      { owner: fakeUser.id, title: 'Bar', description: 'Bar is great' },
    ];
    const getUserProfileData = new GetUserProfileData({
      userGateway: {
        getUserByUserName: async (userName) => fakeUser,
      },
      visualizationGateway: {
        getVisualizationInfosByUserId: async (userId) => fakeVisualizationInfos,
      },
      datasetGateway: {
        getDatasetInfosByUserId: async (userId) => fakeDatasetInfos,
      },
    });

    it('should get user and visualization infos from gateways', async () => {
      const requestModel = { userName: 'bob' };
      const responseModel = await getUserProfileData.execute(requestModel);
      assert.deepEqual(responseModel, {
        user: fakeUser,
        visualizationInfos: fakeVisualizationInfos,
      });
    });

    it('should return ci user for ci userName', async () => {
      const requestModel = { userName: 'ci' };
      const responseModel = await getUserProfileData.execute(requestModel);
      assert.deepEqual(responseModel, {
        user: ciUser,
        visualizationInfos: fakeVisualizationInfos,
      });
    });
  });

  describe('Export Visualization', () => {
    const exportVisualization = new ExportVisualization({
      visualizationGateway,
    });
    it('should error if no id specified.', (done) => {
      const requestModel = { id: null };
      exportVisualization.execute(requestModel).catch((error) => {
        assert.equal(error.message, i18n('errorNoId'));
        done();
      });
    });
    it('should return zipped stored object if success.', async () => {
      const requestModel = {
        id: visualizationId,
      };
      const { zipFileBuffer, zipFileName } = await exportVisualization.execute(
        requestModel
      );

      assert.equal(zipFileName, 'Untitled.zip');
      //assert.equal(zipFileBuffer.toString('base64').length, 1540);
    });
  });

  describe('Get All Visualization Infos', () => {
    const fakeVisualizationInfos = [
      { owner: fakeUser.id, title: 'Foo', description: 'Foo is cool' },
      { owner: fakeUser.id, title: 'Bar', description: 'Bar is great' },
    ];

    const getAllVisualizationInfos = new GetAllVisualizationInfos({
      visualizationGateway: {
        getAllVisualizationInfos: async () => fakeVisualizationInfos,
      },
    });

    it('should get visualization infos from gateway', async () => {
      const responseModel = await getAllVisualizationInfos.execute();
      assert.deepEqual(responseModel, {
        visualizationInfos: fakeVisualizationInfos,
      });
    });
  });

  describe('Delete Visualization', () => {
    const visualizationGateway = {
      deleteVisualization: async ({ visualization }) => ({ status: 'success' }),
      getVisualization: async ({ id }) => ({ info: { owner: '123' } }),
    };
    const deleteVisualization = new DeleteVisualization({
      visualizationGateway,
    });

    it('should invoke deleteVisualization in gateway.', async () => {
      const requestModel = {
        id: '47389',
        userId: '123',
      };
      const responseModel = await deleteVisualization.execute(requestModel);
      assert.equal(responseModel.status, 'success');
    });

    it('should error if user does not match owner.', (done) => {
      const requestModel = {
        id: '47389',
        userId: '234',
      };
      deleteVisualization.execute(requestModel).catch((error) => {
        assert.equal(error.message, i18n('errorNotOwnerCantDelete'));
        done();
      });
    });
  });

  describe('Update Images', () => {
    const visualization = {
      info: {},
    };
    const images = {
      thumbnail: 'foo',
      preview: 'bar',
    };
    let updatedImages;
    const updateImages = new UpdateImages(
      {
        visualizationGateway: {
          getVisualization: async ({ id }) => visualization,
          getAllVisualizationInfos: async () => [visualization],
          setImagesUpdatedTimestamp: async ({ id, imagesUpdatedTimestamp }) =>
            'success',
        },
        imageGeneratorGateway: {
          generateImages: async () => images,
        },
        imageStorageGateway: {
          updateImages: async ({ id, images }) => {
            updatedImages = images;
          },
        },
      },
      1000
    );

    it('should generate images for visualization with no image.', async () => {
      await updateImages.execute();
      assert.deepEqual(updatedImages, images);
    });
  });
});
