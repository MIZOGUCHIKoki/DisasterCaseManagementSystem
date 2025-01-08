# ベースイメージとして MySQL 8.0 を使用
FROM mysql:8.0

# 環境変数を設定
ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes
ENV MYSQL_DATABASE=demo
ENV TZ=Asia/Tokyo

# MySQLの認証プラグインを設定
CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]
