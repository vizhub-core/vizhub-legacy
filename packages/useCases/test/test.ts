import * as assert from 'assert';
import { i18n } from 'datavis-tech-i18n';
import { ciUser, testData, timestamp } from 'datavis-tech-entities';

import {
  CreateVisualization,
  CreateVisualizationRequestModel,
  CreateVisualizationResponseModel,

  GetVisualization,
  GetVisualizationRequestModel,
  GetVisualizationResponseModel,

  ExportVisualization,
  ExportVisualizationRequestModel,
  ExportVisualizationResponseModel,

  SaveVisualization,
  SaveVisualizationRequestModel,
  SaveVisualizationResponseModel,

  CreateDataset,
  CreateDatasetRequestModel,
  CreateDatasetResponseModel,

  GetDataset,
  GetDatasetRequestModel,
  GetDatasetResponseModel,

  ForkVisualization,
  ForkVisualizationRequestModel,
  ForkVisualizationResponseModel,
  
  CreateUser,
  CreateUserRequestModel,
  CreateUserResponseModel,

  GetUser,
  GetUserRequestModel,
  GetUserResponseModel,

  GetUserProfileData,
  GetUserProfileDataRequestModel,
  GetUserProfileDataResponseModel,
} from '../src/index';

const visualizationGateway = {
  createVisualization: async (options) => {
    const { id } = options;
    options.info = options;
    options.content = options;
    visualizationGateway[id] = options;
    return { id };
  },
  getVisualization: async ({ id }) => {
    return visualizationGateway[id];
  }
};

const datasetGateway = {};

const fakeUser = {
  "authenticated": undefined,
  "id": "84752",
  "userName": "joe",
  "fullName": "Joe Schmoe",
  "email": "joe@datavis.tech",
  "avatarUrl": "https://avatars3.githubusercontent.com/u/84752?v=4",
  "company": "Schmoe INC",
  "website": "joeschmoe.com",
  "location": "Earth",
  "bio": "Great guy"
};

describe('Use Cases', () => {

  let visualizationId;

  describe('Create Visualization', () => {
    const createVisualization = new CreateVisualization({ visualizationGateway });
    it('should error if no owner specified.', done => {
      const requestModel: CreateVisualizationRequestModel = { owner: null };
      createVisualization.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoOwner'))
        done();
      });
    });
    it('should return an id if success.', async () => {
      const requestModel: CreateVisualizationRequestModel = {
        owner: testData.user.id
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
      userGateway
    });
    it('should error if no id specified.', done => {
      const requestModel: GetVisualizationRequestModel = { id: null };
      getVisualization.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoId'))
        done();
      });
    });
    it('should return stored object if success.', async () => {
      const requestModel: GetVisualizationRequestModel = {
        id: visualizationId
      };
      const { visualization } = await getVisualization.execute(requestModel);
      const { createdTimestamp, lastUpdatedTimestamp } = visualization;
      
      assert(timestamp() - createdTimestamp < 1);
      assert(timestamp() - lastUpdatedTimestamp < 1);
    });
  });

  describe('Save Visualization', () => {
    let invocations = 0;
    let vis;
    const visualizationGateway = {
      saveVisualization: async ({ visualization }) => {
        vis = visualization;
        invocations++;
        return { status: 'success' };
      }
    };
    const saveVisualization = new SaveVisualization({ visualizationGateway });

    it('should invoke saveVisualization with updated timestamp in gateway.', async () => {
      const requestModel = {
        visualization: {
          info: {
            owner: '123'
          }
        },
        userId: '123'
      };
      const responseModel = await saveVisualization.execute(requestModel);
      assert.equal(invocations, 1);
      assert(timestamp() - vis.info.lastUpdatedTimestamp < 1);
      assert.equal(responseModel.status, 'success');
    });

    it('should error if user does not match owner.', done => {
      invocations = 0;
      const requestModel = {
        visualization: {
          info: {
            owner: '123'
          }
        },
        userId: '234'
      };
      saveVisualization.execute(requestModel)
        .catch(error => {
          assert.equal(invocations, 0);
          assert.equal(error.message, i18n('errorNotOwnerCantSave'))
          done();
        });
    });
  });
  describe('Create Dataset', () => {
    const createDataset = new CreateDataset({ datasetGateway });
    it('should error if no owner specified.', done => {
      const requestModel: CreateDatasetRequestModel = {
        owner: null,
        title: 'Foo',
        slug: 'foo',
        description: 'Foo is cool',
        file: {
          name: 'foo',
          text: 'foo'
        },
        sourceName: 'Flaring Central',
        sourceUrl: 'https://flaring.central',
      };
      createDataset.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoOwner'))
        done();
      });
    });
    // TODO test success case
  });

  describe('Get Dataset', () => {
    const userGateway = { getUser: async (id) => fakeUser };
    const getDataset = new GetDataset({
      datasetGateway,
      userGateway
    });
    it('should error if no slug specified.', done => {
      const requestModel: GetDatasetRequestModel = {
        userName: 'thomas',
        slug: ''
      };
      getDataset.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoId'))
        done();
      });
    });
    // TODO test success case
  });
  
  describe('Fork Visualization', () => {
    let invocations = 0;
    let arg;
    const userGateway = { getUser: async (id) => fakeUser };
    const visualizationGateway = {
      createVisualization: async (argument) => {
        arg = argument;
        invocations++;
        return { id: '1234' };
      }
    };
    const forkVisualization = new ForkVisualization({
      visualizationGateway,
      userGateway
    });
    it('should error if no owner specified.', done => {
      const requestModel: ForkVisualizationRequestModel = {
        visualization: {
          info: {
            id: '456',
            owner: '123'
          },
          content: {
            files: [{ name: 'index.html', text: 'HTML yes' }]
          }
        },
        owner: null
      };
      forkVisualization.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoOwner'))
        assert.equal(invocations, 0);
        done();
      });
    });

    it('should invoke gateway if owner specified.', async () => {
      const requestModel: ForkVisualizationRequestModel = {
        visualization: {
          id: '456',
          info: {
            owner: '123',
            title: 'foo',
            description: 'Foo is cool'
          },
          content: {
            files: [{ name: 'index.html', text: 'HTML yes' }]
          }
        },
        owner: '456'
      };

      const responseModel = await forkVisualization.execute(requestModel);
      assert.deepEqual(responseModel, {
        id: "1234",
        userName: "joe"
      });

      assert.equal(invocations, 1);

      assert(timestamp() - arg.createdTimestamp < 1);
      assert(timestamp() - arg.lastUpdatedTimestamp < 1);

      delete arg.createdTimestamp;
      delete arg.lastUpdatedTimestamp;

      const expected = {
        "id": arg.id,
        "owner": "456",
        "title": "foo",
        "description": "Foo is cool",
        "files": [ { "name": "index.html", "text": "HTML yes" } ],
        "forkedFrom": "456",
        "slug": undefined
      };
      assert.deepEqual(arg, expected);
    });
    // TODO test success case
  });

  describe('Create User', () => {
    const userGateway = { createUser: async (user) => user };
    const createUser = new CreateUser({ userGateway });

    it('should invoke gateway with user instance', async () => {
      const requestModel: CreateUserRequestModel = {
        "oAuthProfile": {
          "id": "84752",
          "displayName": "Joe Schmoe",
          "username": "joe",
          "_json": {
            "avatar_url": "https://avatars3.githubusercontent.com/u/84752?v=4",
            "name": "Joe Schmoe",
            "company": "Schmoe INC",
            "blog": "joeschmoe.com",
            "location": "Earth",
            "email": "joe@datavis.tech",
            "bio": "Great guy",
          }
        }
      };
      const responseModel = await createUser.execute(requestModel);
      assert.deepEqual(responseModel, { user: fakeUser });
    });
  });

  describe('Get User', () => {
    const userGateway = { getUser: async (id) => fakeUser };
    const getUser = new GetUser({ userGateway });

    it('should invoke gateway with user instance', async () => {
      const requestModel = { id: "84752" };
      const responseModel = await getUser.execute(requestModel);
      assert.deepEqual(responseModel, { user: fakeUser });
    });

    it('should return ci user for ci user id', async () => {
      const requestModel = { id: ciUser.id };
      const responseModel = await getUser.execute(requestModel);
      assert.deepEqual(responseModel, { user: ciUser });
    });
  });

  describe('Get User Profile Data', () => {
    const fakeVisualizationInfos = [
      { owner: fakeUser.id, title: 'Foo', description: 'Foo is cool' },
      { owner: fakeUser.id, title: 'Bar', description: 'Bar is great' }
    ];
    const fakeDatasetInfos = [
      { owner: fakeUser.id, title: 'Foo', description: 'Foo is cool' },
      { owner: fakeUser.id, title: 'Bar', description: 'Bar is great' }
    ];
    const getUserProfileData = new GetUserProfileData({
      userGateway: {
        getUserByUserName: async (userName) => fakeUser
      },
      visualizationGateway: {
        getVisualizationInfosByUserId: async (userId) => fakeVisualizationInfos
      },
      datasetGateway: {
        getDatasetInfosByUserId: async (userId) => fakeDatasetInfos
      }
    });

    it('should get user and visualization infos from gateways', async () => {
      const requestModel = { userName: 'bob' };
      const responseModel = await getUserProfileData.execute(requestModel);
      assert.deepEqual(responseModel, {
        user: fakeUser,
        visualizationInfos: fakeVisualizationInfos,
        datasetInfos: fakeDatasetInfos
      });
    });

    it('should return ci user for ci userName', async () => {
      const requestModel = { userName: 'ci' };
      const responseModel = await getUserProfileData.execute(requestModel);
      assert.deepEqual(responseModel, {
        user: ciUser,
        visualizationInfos: fakeVisualizationInfos,
        datasetInfos: fakeDatasetInfos
      });
    });
  });

  describe('Export Visualization', () => {
    const exportVisualization = new ExportVisualization({
      visualizationGateway
    });
    it('should error if no id specified.', done => {
      const requestModel: ExportVisualizationRequestModel = { id: null };
      exportVisualization.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoId'))
        done();
      });
    });
    it('should return zipped stored object if success.', async () => {
      const requestModel: ExportVisualizationRequestModel = {
        id: visualizationId
      };
      const {
        zipFileBuffer,
        zipFileName
      } = await exportVisualization.execute(requestModel);
      
      assert.equal(zipFileName, 'Untitled.zip');
      //assert.equal(zipFileBuffer.toString('base64').length, 1540);
    });
  });
});
