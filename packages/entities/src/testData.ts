import { VISUALIZATION_TYPE, DATASET_TYPE } from './documentTypes';
import { User } from './user';
import { VisualizationInfo } from './visualizationInfo';
import { VisualizationContent } from './visualizationContent';
import { Visualization } from './visualization';
import { DatasetInfo } from './datasetInfo';
import { DatasetContent } from './datasetContent';
import { Dataset } from './dataset';
import { timestamp } from './timestamp';

export const userData = {
  authenticated: true,
  id: "84752",
  userName: "joe",
  fullName: "Joe Schmoe",
  email: "joe@datavis.tech",
  avatarUrl: "https://avatars3.githubusercontent.com/u/84752?v=4",
  company: "Schmoe INC",
  website: "joeschmoe.com",
  location: "Earth",
  bio: "Great guy"
};

export const user = new User(userData);

const visualizationId = '123';
const datasetId = '234';

export const visualizationContentData = {
  id: visualizationId,
  files: [
    {
      name: 'index.html',
      text: '<body><h1>Hello!</h1><script src="index.js"></body>'
    },
    {
      name: 'index.js',
      text: "import foo from './foo'; console.log(foo);"
    },
    {
      name: 'foo.js',
      text: "export default 'I am foo';"
    }
  ]
};

export const documentInfoData = {
  id: visualizationId,
  documentType: VISUALIZATION_TYPE,
  owner: user.id,
  title: 'Foo',
  slug: 'foo',
  description: 'Foo the great',
  createdTimestamp: timestamp(),
  lastUpdatedTimestamp: timestamp()
};

export const visualizationInfoData = Object.assign({}, documentInfoData, {
  forkedFrom: '012',
  height: 600
});

export const visualizationInfo = new VisualizationInfo(visualizationInfoData);
export const visualizationContent = new VisualizationContent(visualizationContentData);
export const visualization = new Visualization({ visualizationInfo, visualizationContent });

export const datasetInfoData = Object.assign({}, documentInfoData, {
  id: datasetId,
  format: 'csv',
  sourceName: 'Flaring Central',
  sourceUrl: 'https://flaring.central/'
});

export const datasetContentData = {
  id: datasetId,
  text: 'a,b,c\n1,2,3\n4,5,6'
};

export const datasetInfo = new DatasetInfo(datasetInfoData);

export const datasetContent = new DatasetContent(datasetContentData);
export const dataset = new Dataset({ datasetInfo, datasetContent });
