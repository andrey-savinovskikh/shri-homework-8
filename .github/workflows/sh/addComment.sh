#! /usr/bin/env bash

url="$TRACKER_HOST/v2/issues/${taskId}/comments"
headerAuth="Authorization: OAuth ${TRACKER_TOKEN}"
headerOrganization="X-Org-Id: ${TRACKER_ORG_ID}"
headerContentType="Content-Type: application/json"

curl -o /dev/null -s -w "%{http_code}\n" \
--location --request POST "${url}" \
--header "${headerContentType}" \
--header "${headerAuth}"  \
--header "${headerOrganization}" \
--data "${request}"