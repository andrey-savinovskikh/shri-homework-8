#!/usr/bin/env bash

npm ci
npm run build
npm run test

if [ $? = 0 ]
  then testsResultText="Тесты прошли успешно"
  else testsResultText="Тесты провалены"
fi

echo "${testsResultText}"

githubActionsUrl="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"

export request='{
  "text": "'"${testsResultText} ${githubActionsUrl}"'"
}'

resultCode=$(bash ./.github/workflows/sh/addComment.sh)

codeFirstNum=$(echo "${resultCode}" | cut -c 1)

if [ "$codeFirstNum" = "2" ]
then
  echo "Комментарий с результатами тестов успешно сохранен"
  exit 0
else
  echo "Ошибка при сохранении комментария с результатами тестов"
  exit 1
fi
