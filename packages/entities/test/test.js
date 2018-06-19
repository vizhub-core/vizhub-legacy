import assert from 'assert';
import {
  DocumentInfo,
  //VisualizationInfo,
  //DatasetInfo,
  //LibraryInfo
} from '../src';

describe('Entities', () => {
  describe('DocumentInfo', () => {

    it('should expose expected fields', () => {
      const data = {
        id: '123',
        owner: '456',
        title: 'Foo',
        slug: 'foo',
        description: 'Foo the great'
      };
      const documentInfo = new DocumentInfo(data);
      assert(documentInfo instanceof DocumentInfo);
      assert.deepEqual(documentInfo, data);
    });

  });
});
