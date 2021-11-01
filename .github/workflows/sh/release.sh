#!/usr/bin/env bash

curTag=$(git tag | sort -r | head -1)
prevTag=$(git tag | sort -r | head -2 | tail -1)
author=$(git show "$CURRENT_TAG" --pretty=format:"%an" --no-patch)
date=$(git show "$CURRENT_TAG" --pretty=format:"%ar" --no-patch)
changelog=$(git log "$PREVIOUS_TAG".. --pretty=format:"%h - %s (%an, %ar)\n" | tr -s "\n" " ")

export CURRENT_TAG
export PREVIOUS_TAG
export CURRENT_TAG_AUTHOR
export CURRENT_TAG_DATE
export CHANGELOG

bash ./.github/workflows/sh/addTask.sh

echo "Result:"
echo $?

echo "Release Completed!!!"