# vizhub-open-core

Work in progress... An experiment in adopting the [open-core model](https://en.wikipedia.org/wiki/Open-core_model) for [VizHub](https://vizhub.com/).

## Status

Currently all this codebase does is:

 * Interfaces with the existing VizHub database structure (see [vizhub-legacy entities](https://github.com/datavis-tech/vizhub-legacy/tree/master/packages/entities/src)).
 * Defines the "Viz Page" that renders a viz.
 * Renders an empty box (that's the right size) for the viz content.
 * Renders the viz title.
 * Renders Markdown (server rendered, client hydrated, then augmented with real-time synchronization via ShareDB, debounced in a Web Worker).

It looks like this:

![image](https://user-images.githubusercontent.com/68416/127775648-e1b1b53f-6dae-4a8c-ad14-9da7128def73.png)

There is currently no clear path for new developers to start, which is the main issue right now around adoption. See [
Add clear path to get started for new developers](https://github.com/vizhub-open-core/vizhub-open-core/issues/4).

## The Vision

- Sustainable Open Source product of exceptional quality and durability (will last 10+ years).
- Open Source core software wherein the hard problems are solved.
  - Best possible browser based runtime for live coding using ES6 standards.
  - Best possible code editor that _really_ works on mobile.
  - Persistent state with real-time remote synchronization, editable without touching code.
  - Importing from other vizzes to compose complex software.
  - Revision history.
- Proprietary plugins for the paid features of the VizHub product.
  - Real-time collaborative editing, with presence.
  - Teams and associated permissions system.
  - In-app live audio/video meeting experience.
  - Marketplace for pair programming / mentoring services.

## Development

[Install MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

[Install Redis](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

```
sudo service mongod start
redis-server
cd vizhub-open-core
npm install
npm start
```

### Environment Variables

In order to ensure the environment variables persist across reboots, put them in:

```
/etc/environment
```

Example configuration:

```
export VIZHUB_MONGO_URI='mongodb://localhost:27017/vizhub'
export VIZHUB_REDIS_HOST='127.0.0.1'
```

### Variable Naming Conventions

- User
  - userName = the name of the user
- Viz
  - vizId = the id of the viz
  - vizInfo = instance of VizInfo
  - vizInfoMongoDoc = document object from raw MongoDB driver
  - vizInfoShareDBDoc = document object from ShareDB
  - vizInfoShareDBSnapshot = document object from ShareDB
  - vizInfoData = the raw data for the VizInfo constructor
    - This could come from various places, e.g. `vizInfoMongoDoc`, `vizInfoShareDBDoc.data`, `vizInfoShareDBSnapshot.data`
- Pages
  - HomePage = component that renders the page
  - homePagePresenter = function that transforms input data to page inputs
  - homePagePresented = returned value from presenter
- `shareDB` prefix goes on anything specific to [ShareDB](https://github.com/share/sharedb)
  - `shareDBDoc`, `shareDBConnection`, `shareDBSnapshot`, ...
- For MongoDB collections
  - `collectionName` - the string that is the name of the collection
  - `collection` - the thing returned from `db.collection(collectionName)` ([Mongo driver](https://mongodb.github.io/node-mongodb-native/4.0/))
