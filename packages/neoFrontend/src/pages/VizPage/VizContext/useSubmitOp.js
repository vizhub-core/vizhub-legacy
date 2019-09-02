import { useMemo } from 'react';
export const useSubmitOp = shareDBDoc =>
  useMemo(() => {
    if (shareDBDoc) {
      return op => {
        if (op.length > 0) {
          shareDBDoc.submitOp(op);
        }
      };
    }
    return undefined;
  }, [shareDBDoc]);
