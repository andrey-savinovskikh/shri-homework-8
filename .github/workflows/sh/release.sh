#! /usr/bin/env bash

curTag=$(git tag | sort -r | head -1)
prevTag=$(git tag | sort -r | head -2 | tail -1)
author=$(git show "$curTag" --pretty=format:"%an" --no-patch)
date=$(git show "$curTag" -s --format=%cd --date=format:'%Y-%m-%d %H:%M:%S' --no-patch)
changelog=$(git log "$prevTag".. --pretty=format:"%h - %s (%an, %ar)\n" | tr -s "\n" " ")

export curTag
export prevTag
export author
export date
export changelog

searchResult=$(bash ./.github/workflows/sh/searchTask.sh)
taskId=$(echo "$searchResult" | awk -F '"id":"' '{print $2;exit;}' | awk -F '","' '{print $1;exit;}')

export taskId

if [ -z "$taskId" ]
then
  echo "Добавление новой задачи"
  resultCode=$(bash ./.github/workflows/sh/addTask.sh)
else
  echo "Обновление задачи"
  resultCode=$(bash ./.github/workflows/sh/updateTask.sh)
fi

codeFirstNum=$(echo "${resultCode}" | cut -c 1)

if [ "$codeFirstNum" = "2" ]
then
  echo "Задача успешно сохранена"
  exit 0
else
  echo "Ошибка при сохранении задачи"
  exit 1
fi

