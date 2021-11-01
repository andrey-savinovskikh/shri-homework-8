#! /usr/bin/env bash

url="$TRACKER_HOST/v2/issues/_search"
headerAuth="Authorization: OAuth ${TRACKER_TOKEN}"
headerOrganization="X-Org-Id: ${TRACKER_ORG_ID}"
headerContentType="Content-Type: application/json"
request='{
  "filter": {
    "unique": "'"$TRACKER_UNIQUE_PREFIX"'_'"${curTag}"'"
  }
}'

curl --location --request POST "${url}" \
--header "${headerContentType}" \
--header "${headerAuth}"  \
--header "${headerOrganization}" \
--data "$request"