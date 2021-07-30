# vizhub-open-core

Work in progress... An experiment in adopting the [open-core model](https://en.wikipedia.org/wiki/Open-core_model) for VizHub. Feedback welcome!

## The Vision

- Open Source core software wherein the hard problems are solved.

  - Best possible browser based runtime for live coding.
  - Best possible code editor that _really_ works on mobile.
  - Vizzes with persistent state, editable without touching code.
  - Importing from other vizzes to compose complex software.
  - Revision history.

- Proprietary plugins for paid features.
  - Collaborators with presence.
  - Teams.
  - In-app live audio/video meeting experience.

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
