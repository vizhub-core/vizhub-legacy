import { type } from 'ot-json0';

type.transformPresence = function(presence, op, isOwnOp) {
  if (!presence) {
    return null;
  }

  //console.log('TODO transform presence.');
  // Draw from https://github.com/datavis-tech/json0/tree/master/lib
  //
  //var start = presence.index;
  //var end = presence.index + presence.length;
  //var delta = new richText.Delta(op);
  //start = delta.transformPosition(start, !isOwnOp);
  //end = delta.transformPosition(end, !isOwnOp);

  //return Object.assign({}, presence, {
  //  index: start,
  //  length: end - start
  //});
  return presence;
};

export { type };
