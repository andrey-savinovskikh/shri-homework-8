#!/usr/bin/env bash

CURRENT_TAG=$(git tag | tail -1 | head -n1)
PREVIOUS_TAG=$(git tag | tail -2 | head -n1)
CURRENT_TAG_AUTHOR=$(git show "$CURRENT_TAG" --pretty=format:"%an" --no-patch)
CURRENT_TAG_DATE=$(git show "$CURRENT_TAG" --pretty=format:"%ar" --no-patch)
CHANGELOG=$(git log "$PREVIOUS_TAG".. --pretty=format:"%h - %s (%an, %ar)\n" | tr -s "\n" " ")

export CURRENT_TAG
export PREVIOUS_TAG
export CURRENT_TAG_AUTHOR
export CURRENT_TAG_DATE
export CHANGELOG

export REQUEST_DATA='{
  "queue": "'$TRACKER_QUEUE'",
  "summary": "Release '"$CURRENT_TAG"' ('"$CURRENT_TAG_AUTHOR"', '"$CURRENT_TAG_DATE"')",
  "description": "'"$CHANGELOG"'",
  "unique": "'"$TRACKER_UNIQUE_PREFIX"'_'"$CURRENT_TAG"'"
}'

echo "Release Completed!"