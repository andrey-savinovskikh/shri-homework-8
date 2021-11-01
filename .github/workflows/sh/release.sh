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

searchResult=$(bash ./.github/workflows/sh/searchTask.sh)

addResult=$(bash ./.github/workflows/sh/addTask.sh)

#if [ "$addResultCode" -eq 409 ]
#then
#  updateResultCode=$(bash ./.github/workflows/sh/addTask.sh)
#fi

#'

taskId=$(echo "$searchResult" | awk -F '"id":"' '{ print $2 }' | awk -F '","' '{ print $1 }')

echo "Result:"
echo "${searchResult}"
echo "${taskId}"
echo "${addResult}"

echo "Release Completed!"