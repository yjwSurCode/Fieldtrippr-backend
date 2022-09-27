#!/usr/bin/bash

# 本地路径
DIST=dist
# 服务器地址
SERVER_HOST=106.12.154.161
# 服务器路径
TARGET_DIST=/www/wwwroot/

# 打包完，上传到服务器
npm run build && \
scp -r ./$DIST/* root@$SERVER_HOST:$TARGET_DIST