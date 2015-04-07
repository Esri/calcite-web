#!/bin/bash
git branch -D temp-release-branch
git checkout -b temp-release-branch
cp node_modules/patterns-color/scss/variables.scss dist/sass/calcite-web/base/
git add -f dist/
git commit -m "Release"
git push upstream temp-release-branch
gh-release
git checkout master
git branch -D temp-release-branch
git push upstream :temp-release-branch
