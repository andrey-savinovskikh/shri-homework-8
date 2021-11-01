#! /usr/bin/env bash

imageName="shri-homework-8:${curTag}"

docker build -q -t "${imageName}" .

if [ $? -ne 0 ]
then
  echo "Ошибка при создании docker-образа"
  exit 1
fi

echo "Docker-образ создан успешно"

export request='{
  "text": "Docker-образ '"${imageName}"' создан успешно"
}'

resultCode=$(bash ./.github/workflows/sh/addComment.sh)

codeFirstNum=$(echo "${resultCode}" | cut -c 1)

if [ "$codeFirstNum" = "2" ]
then
  echo "Комментарий с Docker-образом сохранен успешно"
  exit 0
else
  echo "Ошибка при сохранении комментария с Docker-образом"
  exit 1
fi