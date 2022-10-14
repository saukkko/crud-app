FROM node:lts-alpine as setup

ARG NODE_ENV=""
COPY master.zip /app/
COPY docker_assets/copy-app.sh /app/
RUN apk update && apk upgrade && apk add unzip tar xz
RUN npm -g i npm

FROM setup as build
ENV NODE_ENV="development"
ARG UID="3000"

WORKDIR /app
RUN unzip master.zip
RUN npm install && npm run build

# TODO:
# create shell script to do this ugly stuff there and RUN script.sh
RUN /app/copy-app.sh

WORKDIR /app/wrk
RUN tar caf app.tar.xz --numeric-owner --owner=${UID} *


FROM node:lts-alpine as install
ARG NODE_ENV="production"
ARG NODE_USER="app"
ARG UID="3000"

ENV NODE_ENV=${NODE_ENV}

# ENTRYPOINT [ "/bin/ash" ]

RUN apk update && apk upgrade && apk add tar xz
RUN npm -g i npm

RUN adduser -u ${UID} -h /app_cache -s /sbin/nologin -D -G nogroup ${NODE_USER} && \
    mkdir -pv /app && \
    chown ${UID} /app
COPY --chown=${UID} --from=build /app/wrk/app.tar.xz /

USER ${UID}
RUN tar xvf app.tar.xz -C /app
WORKDIR /app
RUN npm install

FROM nginx:alpine
COPY --from=install /app /app
COPY --from=install /app_cache /app_cache

ARG UID="3000"
ARG NODE_USER="app"
ARG NODE_ENV="production"
ARG NODE_PORT=53000

ENV NODE_USER=${NODE_USER}
ENV NODE_ENV=${NODE_ENV}
ENV NODE_PORT=${NODE_PORT}

RUN adduser -u ${UID} -h /app_cache -s /sbin/nologin -D -G nogroup ${NODE_USER}

RUN apk update && apk upgrade && apk add nodejs npm s6
RUN npm i -g npm

EXPOSE 8080

COPY docker_assets/server.conf /etc/nginx/conf.d/default.conf
COPY docker_assets/nginx.conf /etc/nginx/nginx.conf
COPY docker_assets/start-express.sh /docker-entrypoint.d/start-express.sh

RUN mkdir -pv /var/log/app_engine
RUN mkdir -pv /app/client/_ah && \
    echo "OK" > /app/client/_ah/health

RUN export USER=${NODE_USER}
