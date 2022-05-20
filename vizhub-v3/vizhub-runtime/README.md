# vizhub-runtime

Builds and runs code (ES modules, JSX) in the browser using [Rollup](https://rollupjs.org/guide/en/) and an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

Inspired by [experimental-runtime](https://github.com/vizhub-core/experimental-runtime).

## Status: Early WIP

Working features:

- Rollup build
- Virtual file system
- Unit tests

Roadmap:

- Build JSX
- Integration tests with Puppeteer
- Initialize an iframe with built JS
- Inject JS into an iframe (hot running)
- Initialize an iframe with configuration
- Inject configuration into an iframe (dynamic configuration)
- Initialize an iframe with CSS
- Inject CSS into an iframe (hot styling)
- Generate a set of files suitable for export
