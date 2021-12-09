#!/bin/bash
# Note: Do this for the first deploy on a new server:
cd packages/neoBackend/
pm2 start --name VizHubAppServer npm -- start
