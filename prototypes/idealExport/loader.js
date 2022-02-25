(async () => {
  const loadCSS = (url) =>
    new Promise((resolve) => {
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      // TODO try link.onload = resolve;
      link.onload = () => {
        resolve();
      };
      document.head.appendChild(link);
    });

  const loadScript = (url) =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => {
        resolve();
      };
      document.head.appendChild(script);
    });

  const jsDelivrCombine = (libs) =>
    'https://cdn.jsdelivr.net/combine/' +
    libs.map((lib) => `npm/${lib}`).join(',');

  const libraries = jsDelivrCombine([
    `react@17.0.2/umd/react.production.min.js`,
    `react-dom@17.0.2/umd/react-dom.production.min.js`,
    `d3@7.3.0/dist/d3.min.js`,
  ]);

  await Promise.all([loadScript(libraries), loadCSS('style.css')]);
  loadScript('bundle.js');
})();
