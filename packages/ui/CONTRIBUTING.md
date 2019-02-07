# Contributing

We welcome contributions to this repository!

Our typical workflow:

 * Open an issue if there's not one open already for the thing you want to work on.
 * Comment on the issue that you'd like to work on it, possibly proposing a solution.
 * Self-assign the issue when you start to work on it.
 * As soon as work starts, create a Pull Request with "WIP" in the title.
   * This makes Work In Progress visible, so folks know it's underway and can review it.
 * For the commit that closes an issue, please include `Closes #5`, replacing `5` with the issue number.
   * This will make it so that the issue automatically gets closed when the PR gets merged.
 * When the work is done, remove "WIP" from the PR title and request a review from @curran.
 * The work will be reviewed and, if approved, merged and deployed!

## Development Environment Setup

Check out the [video tutorial: Coding an IDE with React & Redux-Observable](https://www.youtube.com/watch?v=mrXCmhGmA5I&feature=youtu.be), which covers setup of the development environment and how to navigate the codebase.

The testing app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run locally:

Fork the project and clone it to your machine.

```
cd vizhub-ui
npm install
npm run start
```

This will start the development server, and open a browser to [http://localhost:3000](http://localhost:3000).

Code changes will be watched, recompiled, and reloaded automatically.

If you change the SASS files, you'll need to run the following for it to update:

```
npm run build-css
```
