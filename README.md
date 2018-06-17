# Architecture

This project uses [Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) ([video](https://www.youtube.com/watch?v=o_TH-Y78tt4)).

# Development

At the top level, [Lerna](https://lernajs.io) is used for organizing packages.

```
npm install -g lerna
lerna bootstrap
```

The `lerna bootstrap` command links dependencies between local packages.
