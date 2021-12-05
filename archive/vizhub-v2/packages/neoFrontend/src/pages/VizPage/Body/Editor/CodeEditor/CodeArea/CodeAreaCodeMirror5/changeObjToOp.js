export const changeObjToOp = ({ from, removed, text }, path, doc) => {
  const op = [];
  const i = doc.indexFromPos(from);
  const sd = removed.join('\n');
  const si = text.join('\n');
  const p = path.concat(i);
  if (sd) {
    op.push({ sd, p });
  }
  if (si) {
    op.push({ si, p });
  }
  return op;
};
