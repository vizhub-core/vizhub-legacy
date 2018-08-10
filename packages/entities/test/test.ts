import * as assert from 'assert';
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

  VISUALIZATION_TYPE,
  DATASET_TYPE,

  testData
} from '../src/index';

const {
  userData,
  user,
  visualizationContentData,
  datasetContentData,
  datasetInfoData,
  datasetContent,
  datasetInfo,
  dataset,
  documentInfoData,
  visualizationInfoData,
  visualizationInfo,
  visualizationContent,
  visualization,
} = testData;

describe('Entities', () => {

  describe('User', () => {
    it('should expose expected fields', () => {
      assert.deepEqual(user, userData);
    });
  });

  describe('DocumentPart', () => {
    it('should expose id and documentType', () => {
      const data = { id: '123', documentType: VISUALIZATION_TYPE };
      const documentPart = new DocumentPart(data);
      assert.deepEqual(documentPart, data);
    });
  });

  describe('DocumentInfo', () => {
    it('should expose expected fields', () => {
      const documentInfo = new DocumentInfo(documentInfoData);
      assert.deepEqual(documentInfo, documentInfoData);
    });
  });

  describe('VisualizationInfo', () => {
    it('should expose expected fields', () => {
      const visualizationInfo = new VisualizationInfo(visualizationInfoData);
      const expected = Object.assign({}, visualizationInfoData, {
        documentType: VISUALIZATION_TYPE
      });
      assert.deepEqual(visualizationInfo, expected);
    });
  });

  describe('VisualizationContent', () => {
    it('should expose expected fields', () => {
      const visualizationContent = new VisualizationContent(visualizationContentData);
      const expected = Object.assign({}, visualizationContentData, {
        documentType: VISUALIZATION_TYPE
      });
      assert.deepEqual(visualizationContent, expected);
    });
  });

  describe('Visualization', () => {

    it('should expose expected fields', () => {
      assert.deepEqual(visualization, {
        id: visualizationInfo.id,
        info: visualizationInfo,
        content: visualizationContent
      });
    });

    it('should stringify', () => {
      assert.deepEqual(JSON.parse(JSON.stringify(visualization)), visualization);
    });
  });

  describe('DatasetInfo', () => {
    it('should expose expected fields', () => {
      const expected = Object.assign({}, datasetInfoData, {
        documentType: DATASET_TYPE
      });
      assert.deepEqual(datasetInfo, expected);
    });
  });

  describe('DatasetContent', () => {
    it('should expose expected fields', () => {
      const expected = Object.assign({}, datasetContentData, {
        documentType: DATASET_TYPE
      });
      assert.deepEqual(datasetContent, expected);
    });
  });

  describe('Dataset', () => {

    it('should expose expected fields', () => {
      assert.deepEqual(dataset, {
        id: datasetInfo.id,
        info: datasetInfo,
        content: datasetContent
      });
    });

    it('should stringify', () => {
      assert.deepEqual(JSON.parse(JSON.stringify(dataset)), dataset);
    });
  });

});
