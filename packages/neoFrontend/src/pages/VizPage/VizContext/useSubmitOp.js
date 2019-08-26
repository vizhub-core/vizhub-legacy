import { useMemo } from 'react';
export const useSubmitOp = shareDBDoc =>
  useMemo(() => {
    if (shareDBDoc) {
      return op => shareDBDoc.submitOp(op);
    }
    return undefined;
  }, [shareDBDoc]);
