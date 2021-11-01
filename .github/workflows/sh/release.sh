#!/usr/bin/env bash

curTag=$(git tag | sort -r | head -1)
prevTag=$(git tag | sort -r | head -2 | tail -1)
author=$(git show "$curTag" --pretty=format:"%an" --no-patch)
date=$(git show "$curTag" --pretty=format:"%ar" --no-patch)
changelog=$(git log "$prevTag".. --pretty=format:"%h - %s (%an, %ar)\n" | tr -s "\n" " ")

export curTag
export prevTag
export author
export date
export changelog

addResultCode=$(bash ./.github/workflows/sh/addTask.sh)

echo "Result:"
echo addResultCode

echo "Release Completed!"