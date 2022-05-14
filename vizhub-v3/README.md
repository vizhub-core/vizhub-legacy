# VizHub V3

VizHub V3 is a CMS for interactive visual JavaScript.

Status: alpha software, some core features are working, not enough features to be usable quite yet.

Demo instance 👉 https://vizhub.community

 * **Self-hosted.** (coming soon)
 * **Browser-based JavaScript IDE.** (coming soon)
 * **Develop interactive dataviz collaboratively.** (coming soon)
 * **Embed interactive visuals in any Web page.** (coming soon)
 * **Export code for integration with existing codebases.** (coming soon)

## Working Features So Far

So far this product has:

 * Core technical challenges solved including server rendering, ShareDB integration, integration of CodeMirror 6 with ShareDB and the JSON1 OT type, responsive UI based on Bootstrap, custom Bootstrap theme.
 * Home page, listing all vizzes and updating in real time as data changes.
 * Viz page including placeholder for running code, viz title, and code editor.
 * Code editor navigation including a sidebar listing code files, ability to open and close files.
 * Real-time collaborative code editing.

## Minimum Viable Product (MVP) Roadmap

What features are needed to make this product usable as a self-hosted interactive dataviz CMS for enterprises? It should support small client service teams comprised of managers, designers, and developers. It should be the place where the dataviz deliverables are prototyped, collaboratively developed, iterated, hosted for presentation to clients (staging site), and ultimately exported. Since the exported viz uses industry standards, it is suitable for delivery to clients (without any dependency on VizHub), hosting as a standalone microsite, integration into an existing app, or embedding within an existing site. VizHub should introduce operational efficiencies at all phases of dataviz projects including discovery, data exploration, rapid prototyping, agile iteration, high fidelity design implementation and finishing touches.

The concrete features that need to be developed for the MVP include:

 * VizHub Runtime (builds and runs the code as you type).
 * GitHub authentication (log in using your GitHub account).
 * Fork viz flow (create a new viz by copying an existing viz).
 * Profile page (lists your vizzes)
 * Access control (only the viz owner should be able to edit).
 * Export viz to standard files
 * Documentation and path forward for self hosting (likely will use AWS EKS).

## Development Environment Setup

Clone this repository, then run:

```
npm install
npm start
```

There is also a `Dockerfile` you can use to containerize the app (WIP).
