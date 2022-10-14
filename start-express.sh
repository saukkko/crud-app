#!/bin/sh
set -e

/bin/touch /var/run/express.pid
/bin/chown 3000 /var/run/express.pid
/bin/s6-setuidgid "${USER}" node /app/index.js
