#!/bin/bash
#!/bin/bash

# その他の証明書情報
COUNTRY="JP"
STATE="Kochi"
LOCALITY="Kami"
ORGANIZATION="MIZOGUCHI Koki"
ORGANIZATIONAL_UNIT=""

# CN（Common Name）を標準入力で取得
echo "Enter the Common Name (CN):"
read CN

# CNが入力されていない場合、エラーメッセージを表示して終了
if [ -z "$CN" ]; then
  echo "CN is required!"
  exit 1
fi

SUBJECT="/C=$COUNTRY/ST=$STATE/L=$LOCALITY/O=$ORGANIZATION/OU=$ORGANIZATIONAL_UNIT/CN=$CN"

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout server.key \
  -out server.crt \
  -subj "$SUBJECT"

echo "Certificate generated: server.crt and server.key"

