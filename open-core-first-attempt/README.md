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

```
cd vizhub-open-core
npm install
cd packages/vizhub-ce
npm start
```

[Install MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

### Environment Variables

In order to ensure the environment variables persist across reboots, put them in:

```
/etc/environment
```

Example configuration:

```
export VIZHUB_MONGO_URI='mongodb://localhost:27017/vizhub'
```
