import { getFileTree } from './getFileTree';

test('Parses a single file', () => {
  const file = { name: 'name', text: 'text' };
  const tree = getFileTree([file]);
  expect(tree.children.length).toBe(1);
  expect(tree.children[0].name).toBe('name');
  expect(tree.children[0].file).toBe(file);
});

test('Parses two files', () => {
  const file1 = { name: 'name1', text: 'text1' };
  const file2 = { name: 'name2', text: 'text2' };
  const tree = getFileTree([file1, file2]);
  expect(tree.children.length).toBe(2);
  expect(tree.children[0].name).toBe('name1');
  expect(tree.children[0].file).toBe(file1);
  expect(tree.children[1].name).toBe('name2');
  expect(tree.children[1].file).toBe(file2);
});
