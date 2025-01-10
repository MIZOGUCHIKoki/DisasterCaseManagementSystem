#!/bin/bash

COUNTRY="JP"
STATE="Kochi"
LOCALITY="Kami"
ORGANIZATION="MIZOGUCHI Koki"
ORGANIZATIONAL_UNIT=""
CN=""

if [ $# -eq 1  ]; then
  CN=$1
else
  echo "Enter the Common Name (CN):"
  read CN
  if [ -z "$CN" ]; then
    echo "CN is required!"
    exit 1
  fi
fi

if [ -z "$CN" ]; then
  echo "CN is required but was not provided!"
  exit 1
fi

SUBJECT="/C=$COUNTRY/ST=$STATE/L=$LOCALITY/O=$ORGANIZATION/OU=$ORGANIZATIONAL_UNIT/CN=$CN"


openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout server.key \
  -out server.crt \
  -subj "$SUBJECT"

echo "Certificate generated: server.crt and server.key"
