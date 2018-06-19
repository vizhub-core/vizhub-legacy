import assert from 'assert';
import {
  User,

  DocumentPart,
  DocumentInfo,
  DocumentContent,

  VisualizationInfo,
  VisualizationContent,
  Visualization,

  DatasetInfo,
  DatasetContent,

  //LibraryInfo
  //LibraryContent
} from '../src';

describe('Entities', () => {

  describe('User', () => {
    it('should expose expected fields', () => {
      const data = {
        id: '37584032',
        userName: 'alice',
        fullName: 'Alice the Great',
        email: 'alice@greatness.com'
      };
      const user = new User(data);
      assert(user instanceof User);
      assert.deepEqual(user, data);
    });
  });

  describe('DocumentPart', () => {
    it('should expose id', () => {
      const documentPart = new DocumentPart('123');
      assert(documentPart instanceof DocumentPart);
      assert.equal(documentPart.id, '123');
    });
  });

  const documentInfoData = {
    id: '123',
    owner: '456',
    title: 'Foo',
    slug: 'foo',
    description: 'Foo the great'
  };

  describe('DocumentInfo', () => {
    it('should expose expected fields', () => {
      const documentInfo = new DocumentInfo(documentInfoData);
      assert(documentInfo instanceof DocumentInfo);
      assert(documentInfo instanceof DocumentPart);
      assert.deepEqual(documentInfo, documentInfoData);
    });
  });

  const visualizationInfoData = Object.assign({}, documentInfoData, {
    references: ['635', '925'],
    referencedBy: ['946', '142'],
    forks: ['946', '284'],
    forkedFrom: '012',
    thumbnail: 'base64-afhdjaskfhdasjkhfdjaks'
  });

  describe('VisualizationInfo', () => {
    it('should expose expected fields', () => {
      const visualizationInfo = new VisualizationInfo(visualizationInfoData);
      assert(visualizationInfo instanceof VisualizationInfo);
      assert(visualizationInfo instanceof DocumentInfo);
      assert.deepEqual(visualizationInfo, visualizationInfoData);
    });
  });

  const visualizationContentData = {
    id: '123',
    files: [
      {
        name: 'index.html',
        text: '<script src="index.js">'
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

  describe('VisualizationContent', () => {
    it('should expose expected fields', () => {
      const visualizationContent = new VisualizationContent(visualizationContentData);
      assert(visualizationContent instanceof VisualizationContent);
      assert(visualizationContent instanceof DocumentContent);
      assert.deepEqual(visualizationContent, visualizationContentData);
    });
  });

  describe('Visualization', () => {
    it('should expose expected fields', () => {
      const visualizationInfo = new VisualizationInfo(visualizationInfoData);
      const visualizationContent = new VisualizationContent(visualizationContentData);
      const visualization = new Visualization({
        visualizationInfo,
        visualizationContent
      });
      assert(visualization instanceof Visualization);
      assert.deepEqual(visualization, {
        id: visualizationInfo.id,
        info: visualizationInfo,
        content: visualizationContent
      });
    });
  });

  describe('DatasetInfo', () => {
    it('should expose expected fields', () => {
      const data = Object.assign({}, documentInfoData, {
        format: 'csv'
      });
      const datasetInfo = new DatasetInfo(data);
      assert(datasetInfo instanceof DatasetInfo);
      assert(datasetInfo instanceof DocumentInfo);
      assert.deepEqual(datasetInfo, data);
    });
  });

  describe('DatasetContent', () => {
    it('should expose expected fields', () => {
      const data = {
        id: '123',
        text: 'a,b,c\n1,2,3\n4,5,6'
      };
      const datasetContent = new DatasetContent(data);
      assert(datasetContent instanceof DatasetContent);
      assert(datasetContent instanceof DocumentContent);
      assert.deepEqual(datasetContent, data);
    });
  });

});
