#!/usr/bin/env bash

export curTag=$(git tag | sort -r | head -1)
export prevTag=$(git tag | sort -r | head -2 | tail -1)
export author=$(git show "$curTag" --pretty=format:"%an" --no-patch)
export date=$(git show "$curTag" --pretty=format:"%ar" --no-patch)
export changelog=$(git log "$prevTag".. --pretty=format:"%h - %s (%an, %ar)\n" | tr -s "\n" " ")

searchResult=$(bash ./.github/workflows/sh/searchTask.sh)
taskId=$(echo "$searchResult" | awk -F '"id":"' '{print $2;exit;}' | awk -F '","' '{print $1;exit;}')

if [ -z "$taskId" ]
then
  resultCode=$(bash ./.github/workflows/sh/addTask.sh)
else
  export taskId
  resultCode=$(bash ./.github/workflows/sh/updateTask.sh)
fi

echo "${resultCode}"

codeFirstNum=$(echo "${resultCode}" | cut -c 1)

echo "${codeFirstNum}"

if [ "$codeFirstNum" = "2" ]
then
  echo "Release Completed!"
  exit 0
else
  echo "Error"
  exit 1
fi

