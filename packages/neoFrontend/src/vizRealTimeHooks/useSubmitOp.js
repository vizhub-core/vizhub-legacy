import { useMemo } from 'react';
export const useSubmitOp = (shareDBDoc) =>
  useMemo(
    () => {
      if (!shareDBDoc) {
        return undefined;
      }
    
      return (op, propsToFindDoc) => {
        if (op.length > 0) {
          const doc = shareDBDoc instanceof Function ? shareDBDoc(propsToFindDoc) : shareDBDoc;
          doc.submitOp(op);
        }
      };
    },
    [shareDBDoc]
  );
