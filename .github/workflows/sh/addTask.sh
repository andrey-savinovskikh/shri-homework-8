#! /usr/bin/env bash

url="$TRACKER_HOST/v2/issues/"
headerAuth="Authorization: OAuth ${TRACKER_TOKEN}"
headerOrganization="X-Org-Id: ${TRACKER_ORG_ID}"
headerContentType="Content-Type: application/json"
request='{
  "queue": "'${TRACKER_QUEUE}'",
  "summary": "Release '"${curTag}"' ('"${author}"', '"${date}"')",
  "description": "'"${changelog}"'",
  "unique": "'"${TRACKER_UNIQUE_PREFIX}"'_'"${curTag}"'"
}'

curl -s -w "HTTPSTATUS:%{http_code}" \
--location --request POST "${url}" \
--header "${headerContentType}" \
--header "${headerAuth}"  \
--header "${headerOrganization}" \
--data "${request}"