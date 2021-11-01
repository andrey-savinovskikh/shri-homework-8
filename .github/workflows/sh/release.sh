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

export taskId

echo "${taskId}"

if [ -z "$taskId" ]
then
  echo "Add task"
  resultCode=$(bash ./.github/workflows/sh/addTask.sh)
else
  echo "Update task"

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

