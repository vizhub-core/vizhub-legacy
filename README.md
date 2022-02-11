# VizHub

A platform for interactive graphics.

Try it out 👉 https://vizhub.com/

[![image](https://user-images.githubusercontent.com/68416/146487297-256c5aca-eb67-43a8-8eff-dc68218f914d.png)](https://vizhub.com/)

[![image](https://user-images.githubusercontent.com/68416/145478956-cffca1c5-5c28-4bb4-8def-134329aa0975.png)](https://vizhub.com/curran/ad3f8d0a56cb4293864154a7c62719d4?edit=files&file=index.js)

## VizHub 2

VizHub version 2 is the product currently deployed at https://vizhub.com. Source code for this is located in the [vizhub-v2 directory](https://github.com/vizhub-core/vizhub/tree/main/vizhub-v2). This codebase will remain deployed for some time with maintenance fixes from time to time, but active development energy is going towards VizHub 3.

### VizHub 2 Features

VizHub has enough features to be useful for people who teach data visualization with D3 and React. It has been used in [Data Visualization Course 2018](https://curran.github.io/dataviz-course-2018/), [Datavis 2020](https://datavis.tech/datavis-2020/), and [Get it Right in Black and White](

 * Fork and modify vizzes coded with ES6 in the browser.
 * iFrame-based code execution environment.
 * Uses [https://github.com/vizhub-core/magic-sandbox](https://github.com/vizhub-core/magic-sandbox), the same tech used for [Blockbuilder](http://blockbuilder.org/) circa 2016.
 * Code editor based on CodeMirror 5.
 * Ability to switch between files (only one file is viewable at a time currently).
 * Code editor OT integration with ShareDB and JSON0.
 * Real-time collaborative code editing with presence avatars (but [buggy](https://github.com/vizhub-core/vizhub/blob/main/vizhub-v2/packages/json0-with-presence/index.js#L8)).
 * Embed a viz in any page (iframe-based embed with backlink).
 * Embed a code snippet in any page (iframe-based embed with backlink).
 * Mini mode
 * Full screen mode

## VizHub 3

Try it out 👉 https://beta.vizhub.com/

A re-write of VizHub is in progress, located in the [vizhub-v3 directory](https://github.com/vizhub-core/vizhub/tree/main/vizhub-v3). This is where active development is taking place.

![image](https://user-images.githubusercontent.com/68416/144443632-db541593-580d-4a29-8eb3-4a106d003d06.png)

Goals:

- **Self-hosting** - It should be possible to self-host your own instance using 100% open source code.
- **Extensibility** - It should be possible to extend the core with plugins that add features.
- **Mobile UX** - It should be possible to develop interactive visual software on a smartphone.
- **Internationalization** - The interface should be in your local language, for the global VizHub audience.
- **Accessibility** - The UI should be accessible, fully navigable by keyboard and screen reader.

## Prototypes

This repository houses an archive of prototypes as a reference to draw from for VizHub 3 development.

 * [prototypes/open-core-first-attempt](https://github.com/vizhub-open-core/vizhub/tree/main/prototypes/open-core-first-attempt) - An attempt at a modular architecture. Notable features here include: Server rendering, Proper ShareDB hydration, and Markdown rendering in a Web worker
 * [prototypes/vizhub-v3-false-start](https://github.com/vizhub-open-core/vizhub/tree/main/prototypes/vizhub-v3-false-start) - An earlier false start at a VizHub rewrite. Notable features here include: Working PWA setup, new viz preview design, new home page design.
 * [prototypes/vizhub-v2-false-start](https://github.com/vizhub-open-core/vizhub/tree/main/prototypes/vizhub-v2-false-start) - An ancient effort. Notable features here include: CodeMirror 6 integration, dynamic code editor theming, fonts with ligatures.

## Get Involved
Does this project pique your interest? Please let me know! Feel free to [open an issue](https://github.com/vizhub-open-core/vizhub-ui/issues) or [give me a shout on Twitter](https://twitter.com/currankelleher).
