import assert from 'assert';
import {
  DocumentPart,
  DocumentInfo,
  DocumentContent,
  VisualizationInfo,
  VisualizationContent,
  DatasetInfo,
  DatasetContent
  //LibraryInfo
  //LibraryContent
} from '../src';

describe('Entities', () => {

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

  describe('VisualizationInfo', () => {
    it('should expose expected fields', () => {
      const data = Object.assign({}, documentInfoData, {
        references: ['635', '925'],
        referencedBy: ['946', '142'],
        forks: ['946', '284'],
        forkedFrom: '012',
        thumbnail: 'base64-afhdjaskfhdasjkhfdjaks'
      });
      const visualizationInfo = new VisualizationInfo(data);
      assert(visualizationInfo instanceof VisualizationInfo);
      assert(visualizationInfo instanceof DocumentInfo);
      assert.deepEqual(visualizationInfo, data);
    });
  });

  describe('VisualizationContent', () => {
    it('should expose expected fields', () => {
      const data = {
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
      const visualizationContent = new VisualizationContent(data);
      assert(visualizationContent instanceof VisualizationContent);
      assert(visualizationContent instanceof DocumentContent);
      assert.deepEqual(visualizationContent, data);
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
