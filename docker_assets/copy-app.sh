#!/bin/sh
set -e
APP_DIR=/app/

mkdir -pv ${APP_DIR}wrk/client ${APP_DIR}wrk/server
cp -a ${APP_DIR}client/build/* ${APP_DIR}wrk/client/
cp -a ${APP_DIR}server/build/* ${APP_DIR}wrk/server/
cp -a ${APP_DIR}server/package.json ${APP_DIR}wrk/server/
cp -a ${APP_DIR}server/package-lock.json ${APP_DIR}wrk/server/
cp -a ${APP_DIR}index.js package.json package-lock.json ${APP_DIR}wrk/
