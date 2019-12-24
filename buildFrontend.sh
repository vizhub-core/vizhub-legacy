#!/bin/bash
cd packages/neoFrontend/
npm run build
rm -rf ../neoBackend/build/
cp -r build ../neoBackend/build
cd ../../
