#!/bin/bash

# copy all styles to the dist folder
node config/build/copy-style.js &&
# clear dist from stories and test folders
node config/build/clear-lib.js