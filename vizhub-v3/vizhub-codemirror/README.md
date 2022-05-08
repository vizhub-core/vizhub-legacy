# vizhub-codemirror
The integration of [CodeMirror](https://codemirror.net/6/) and [ShareDB](https://github.com/share/sharedb) (with [JSON1](https://github.com/ottypes/json1)) that powers the VizHub code editor. This package is a custom build of CodeMirror that also bundles [codemirror-ot](https://github.com/vizhub-core/codemirror-ot) with it. This module is fetched dynamically when the user opens the editor section of [vizhub-app](https://github.com/vizhub-core/vizhub/tree/main/vizhub-v3/vizhub-app).

**Note:** This package does *not* contain `codemirror-ot` as a dependency in `package.json`, but source files here *do* `import { ... } from 'codemirror-ot'`. This is because `codemirror-ot` resides in a sibling directory via Git submodules. It was set up this way so that it's easier to develop `codemirror-ot` in the context of this package. Othersize, we'd need to re-publish `codemirror-ot` every time we want to test a change there inside of `vizhub-codemirror`.

This package contains a demo app showing a bare bones multiplayer text editor.
