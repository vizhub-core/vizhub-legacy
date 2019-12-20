import { useMemo } from 'react';
export const useSubmitOp = shareDBDoc =>
  useMemo(
    () =>
      shareDBDoc
        ? op => {
            if (op.length > 0) {
              shareDBDoc.submitOp(op);
            }
          }
        : undefined,
    [shareDBDoc]
  );
