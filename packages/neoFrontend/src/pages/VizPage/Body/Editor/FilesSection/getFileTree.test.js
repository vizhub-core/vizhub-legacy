import { getFileTree } from './getFileTree';
test('Parses a single file', () => {
  const tree = getFileTree([{ name: 'name', text: 'text' }]);
  expect(tree.children.length).toBe(1);
});
