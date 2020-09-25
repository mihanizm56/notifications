#!/bin/bash

DEPLOY_TAG=$1

git add "."
HUSKY_SKIP_HOOKS=1 git commit -m "update tag"

git tag "${DEPLOY_TAG}"

git push --tags

echo -en ""
echo -en "Deployed tag: \e[40;1;42m $DEPLOY_TAG \e[m\n"



