#!/bin/sh
set -e

/bin/touch /var/run/express.pid
/bin/chown 3000 /var/run/express.pid
/bin/s6-setuidgid "${NODE_USER}" node /app/index.js
