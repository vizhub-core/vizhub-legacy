export const getVizIdList = async (page, parentHandle) =>
  await page.evaluate(
    (parentNode) =>
      Array.from(parentNode.querySelectorAll('.test-viz-preview'), (el) =>
        el.getAttribute('data-test-viz-id')
      ),
    parentHandle
  );
