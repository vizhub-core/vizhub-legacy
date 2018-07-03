# Architecture

This project aspires to [Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) ([video](https://www.youtube.com/watch?v=o_TH-Y78tt4)).

[![DVT2_Architecture.svg](/uploads/cc1af8f7b4479f09afca8972f87c0afd/DVT2_Architecture.svg)](https://docs.google.com/drawings/d/1g7GpgpqFvLzh2RuON4Pe95Qt1Lj3pRmpOGFoIVrzd74/edit)

Clean Architecture Resources:

 * [YouTube: Reactive, Clean Architecture](https://www.youtube.com/watch?v=16wPp91kyuE)
 * [Medium: Clean JavaScript: Using use-case interactors](https://medium.com/@dtinth/clean-javascript-using-use-case-interactors-f3a50c138154)
 * [GitHub: cleancoders/CleanCodeCaseStudy/cleancoderscom](https://github.com/cleancoders/CleanCodeCaseStudy/tree/master/src/cleancoderscom)
 * [GitHub: lukemorton/typescript-clean-architecture-example](https://github.com/lukemorton/typescript-clean-architecture-example)
 * [GitHub: michaelklopf/clean-architecture](https://github.com/michaelklopf/clean-architecture)


# Entities

![classDiagram](/uploads/aedd845af9cb71dcb9bcc107bf7a1b87/classDiagram.png)

Documentation for each entity can be found in `packages/entities/src`.

# Development

At the top level, [Lerna](https://lernajs.io) is used for organizing packages.

```
npm install -g lerna
lerna bootstrap
```

The `lerna bootstrap` command links dependencies between local packages.

Run `npm test` to test all packages.

# Web

The front end code is located in `packages/web`.

The user interface code is organized using [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) [video](https://vimeo.com/67476280).
