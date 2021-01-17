import { useEffect, useState } from 'react';

export const useLicenseToHtmlRenderer = () => {
  const [renderer, setRenderer] = useState(() => () => 'Loading...');

  useEffect(() => {
    (async () => {
      const renderer = (await import('spdx-to-html')).default;
      setRenderer(() => (spdxLicenseString) =>
        `${renderer(spdxLicenseString)} Licensed`
      );
    })();
  }, [setRenderer]);

  return renderer;
};
