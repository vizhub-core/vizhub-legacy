# VizHub

This repository contains the web app deployed to https://vizhub.com.

See also https://github.com/datavis-tech/vizhub-ui

Table of Contents:

 * [Product](#product)
 * [Architecture](#architecture)
 * [Entities](#entities)
 * [Use Cases](#use-cases)
 * [Development](#development)
 * [Web](#web)
 * [Production](docs/production.md)

# Product

>A platform to facilitate teaching and learning data visualization using D3.js and SVG.

Target audience:

 * Teachers of Data Visualization
 * Students of Data Visualization
 * Beta testing will occur with WPI Online Data Visualization course in Fall 2018

Related products:

 * [https://bl.ocks.org](https://bl.ocks.org)
 * [https://blockbuilder.org/](https://blockbuilder.org/)
 * [https://observablehq.com](https://observablehq.com)
 * [https://codesandbox.io](https://codesandbox.io)
 * [https://stackblitz.com/](https://stackblitz.com/)

# Architecture

This project aspires to [Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) ([video](https://www.youtube.com/watch?v=o_TH-Y78tt4)).

[![DVT2_Architecture.svg](https://user-images.githubusercontent.com/68416/47646563-4ee6df80-db9a-11e8-96c5-d4ff35d625ed.png)](https://docs.google.com/drawings/d/1g7GpgpqFvLzh2RuON4Pe95Qt1Lj3pRmpOGFoIVrzd74/edit)

The UI package will be Open Source, following the [Open Core Model](https://en.wikipedia.org/wiki/Open_core). This is inspired by the success of this model with [CodeSandbox.io](https://github.com/CompuIves/codesandbox-client). The idea is that the actual architectural core will remain proprietary so that commercial features can be offered, while enabling users and supporters of the product to:

 * inspect and comment on our public backlog
 * provide feedback via GitHub issues
 * contribute UI tweaks/features

Clean Architecture Resources:

 * [YouTube: Reactive, Clean Architecture](https://www.youtube.com/watch?v=16wPp91kyuE)
 * [Medium: Clean JavaScript: Using use-case interactors](https://medium.com/@dtinth/clean-javascript-using-use-case-interactors-f3a50c138154)
 * [GitHub: cleancoders/CleanCodeCaseStudy/cleancoderscom](https://github.com/cleancoders/CleanCodeCaseStudy/tree/master/src/cleancoderscom)
 * [GitHub: lukemorton/typescript-clean-architecture-example](https://github.com/lukemorton/typescript-clean-architecture-example)
 * [GitHub: michaelklopf/clean-architecture](https://github.com/michaelklopf/clean-architecture)

# Entities
`packages/entities`

![entityDiagram](https://user-images.githubusercontent.com/68416/47646746-e3e9d880-db9a-11e8-903b-640203f52787.png)

# Use Cases
`packages/useCases`

![useCasesDiagram](https://user-images.githubusercontent.com/68416/47646754-e9472300-db9a-11e8-82cb-74e1d7588904.png)

# Development

Check out this [intro to VizHub Development video](https://www.youtube.com/watch?v=P-tilB8pMoI&feature=youtu.be)

This project uses Git submodules, so first run this:

```
git submodule update --init
```

At the top level, [Lerna](https://lernajs.io) is used for organizing packages.

```
npm install -g lerna
lerna bootstrap
```

The `lerna bootstrap` command links dependencies between local packages.

Run `npm test` to test all packages except `web`.
Run `npm run testAll` to test all packages including `web`.

The command `lerna bootstrap && npm run testAll` can be used to do a full check on the current code.


# Web
`packages/web`

To start the dev server:

```
cd packages/web
npm run dev
```

Run `npm run testAll` to test all packages including `web` (depends on having the dev server running).

**Note** You need to run `lerna bootstrap` for the `web` package to see changes made in other packages.

Typical workflow:

 * Change code in any package
 * `lerna bootstrap && npm run testAll`
 * Restart the dev server in a seperate terminal after `lerna bootstrap` is finished, to get the updates.
 * Access `http://localhost:3000` for manual UI testing
   * **Note** The end-to-end `web` test emits the IDs of created documents, which you can use to save manual testing time.

The user interface code is organized using [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) [video](https://vimeo.com/67476280).
