#! /usr/bin/env bash

curTag=$(git tag | sort -r | head -1)
author=$(git show "$curTag" --pretty=format:"%an" --no-patch)
date=$(git show "$curTag" -s --format=%cd --date=format:'%Y-%m-%d %H:%M:%S' --no-patch)
imageName="shri-homework-8:${curTag}"

docker build -q -t "${imageName}" .

if [ $? -ne 0 ]
then
  echo "Ошибка при создании docker-образа"
  exit 1
fi

echo "Docker-образ создан успешно"

url="$TRACKER_HOST/v2/issues/"
headerAuth="Authorization: OAuth ${TRACKER_TOKEN}"
headerOrganization="X-Org-Id: ${TRACKER_ORG_ID}"
headerContentType="Content-Type: application/json"
request='{
  "queue": "'${TRACKER_QUEUE}'",
  "summary": "Artifact '"${curTag}"' ('"${author}"', '"${date}"')",
  "description": "Docker image '"${imageName}"' successfully built"
}'

resultCode=$(
  curl -o /dev/null -s -w "%{http_code}\n" \
  --location --request POST "${url}" \
  --header "${headerContentType}" \
  --header "${headerAuth}" \
  --header "${headerOrganization}" \
  --data "${request}"
)

codeFirstNum=$(echo "${resultCode}" | cut -c 1)

if [ "$codeFirstNum" = "2" ]
then
  echo "Задача успешно сохранена"
  exit 0
else
  echo "Ошибка при сохранении задачи"
  exit 1
fi