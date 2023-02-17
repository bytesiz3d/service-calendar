#!/usr/bin/env sh

# abort on errors
set -e

# navigate into the build output directory
cd dist
rm -rf .git

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

git init -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:bytesiz3d/service-calendar.git main:gh-pages

cd -