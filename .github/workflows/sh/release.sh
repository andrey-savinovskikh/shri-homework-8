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
taskId=$(echo "$searchResult" | awk -F '"id":"' '{print $2;exit;}' | awk -F '","' '{print $1;exit;}')

if [ -z "$taskId" ]
then
  resultCode=$(bash ./.github/workflows/sh/addTask.sh)
else
  export taskId
  resultCode=$(bash ./.github/workflows/sh/updateTask.sh)
fi

echo "Result:"
echo "${resultCode}"

echo "Release Completed!!"