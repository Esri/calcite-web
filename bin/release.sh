#!/bin/bash
git branch -D release
git checkout -b release
git pull --rebase upstream release
npm run rollup
npm run sass:dist
node ./bin/minify.js
git add -f dist/
git commit -m "Release"
git push upstream release
npm run gh-release
git checkout master
git branch -D release
