#!/bin/bash
git branch -D release
git checkout -b release
git pull --rebase upstream release
rm -rf ./dist/
grunt dist
git add -f dist/
git commit -m "Release"
git push upstream release
npm run gh-release
git checkout master
git branch -D release
