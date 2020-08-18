#!/bin/bash

PROJECT_PATH="/home/mihanizm56/Documents/Own/empty_test-folder/test/rus"

BASE_PATH="${PROJECT_PATH}/node_modules/@wildberries/notifications"

# build module
npm run build

# make filesystem operations
rm -fr "${BASE_PATH}/dist"
mkdir "${BASE_PATH}/dist"
cp -avr dist "${BASE_PATH}"

# go to the projetc folder
cd $PROJECT_PATH

# run the project
npx react-app-rewired start