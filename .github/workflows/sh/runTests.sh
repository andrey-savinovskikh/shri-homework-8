#!/usr/bin/env bash

curTag=$(git tag | sort -r | head -1)
author=$(git show "$curTag" --pretty=format:"%an" --no-patch)
date=$(git show "$curTag" --pretty=format:"%ar" --no-patch)

npm ci
npm run build
results=$(npm run test 2>&1 | tail -n +3 | tr -s "\n" " ")

echo "Тесты проведены"

url="$TRACKER_HOST/v2/issues/"
headerAuth="Authorization: OAuth ${TRACKER_TOKEN}"
headerOrganization="X-Org-Id: ${TRACKER_ORG_ID}"
headerContentType="Content-Type: application/json"
request='{
  "queue": "'${TRACKER_QUEUE}'",
  "summary": "Tests results '"${curTag}"' ('"${author}"', '"${date}"')",
  "description": "'"${results}"'"
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
