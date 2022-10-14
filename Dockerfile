FROM node:lts-alpine as setup

ARG NODE_ENV="production"
ARG USER="nodeuser"
ARG GROUP="nodeuser"
ARG UID="3000"
ARG GID="3000"

COPY master.zip /app/
RUN apk update && apk upgrade && apk add unzip tar xz
RUN npm -g i npm

ENTRYPOINT [ "/bin/ash" ]

FROM setup as build
ENV NODE_ENV="development"

WORKDIR /app
RUN unzip master.zip
RUN npm install

RUN mkdir -pv wrk/client wrk/server && \
    cp -a client/build/* wrk/client/ && \
    cp -a server/build/* wrk/server/ && \
    cp -a server/package.json wrk/server/ && \
    cp -a server/package-lock.json wrk/server/ && \
    cp -a package.json package-lock.json wrk/

WORKDIR /app/wrk
RUN tar caf app.tar.xz --numeric-owner --owner=${UID} --group=${GID} *


FROM node:lts-alpine as install
ENV NODE_ENV=${NODE_ENV}

RUN apk update && apk upgrade && apk add tar xz
RUN npm -g i npm

RUN addgroup -g ${GID} ${GROUP} && \
    adduser -u ${UID} -h /app_cache -s /sbin/nologin -D -G ${GROUP} ${USER}
USER ${UID}
COPY --chown=${UID}:${GID} --from=build /app/app.tar.xz /app/

WORKDIR /app
RUN npm install

FROM install as run
USER ${UID}
WORKDIR /app

ENTRYPOINT [ "/bin/ash" ]
# ENTRYPOINT [ "npm" "start" ]