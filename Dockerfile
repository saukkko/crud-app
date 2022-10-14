FROM node:lts-alpine as setup

ARG NODE_ENV="production"
ARG PORT=3000

COPY master.zip /app/
RUN apk update && apk upgrade && apk add unzip tar xz
RUN npm -g i npm

# ENTRYPOINT [ "/bin/ash" ]

FROM setup as build
ENV NODE_ENV="development"
ARG UID="3000"

WORKDIR /app
RUN unzip master.zip
RUN npm install && npm run build

# TODO:
# create shell script to do this ugly stuff there and RUN script.sh
RUN mkdir -pv wrk/client wrk/server && \
    cp -a client/build/* wrk/client/ && \
    cp -a server/build/* wrk/server/ && \
    cp -a server/package.json wrk/server/ && \
    cp -a server/package-lock.json wrk/server/ && \
    cp -a package.json package-lock.json wrk/

WORKDIR /app/wrk
RUN tar caf app.tar.xz --numeric-owner --owner=${UID} *


FROM node:lts-alpine as install
ARG NODE_ENV="production"
ARG PORT=3000
ARG USER="nodeuser"
ARG UID="3000"

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
EXPOSE ${PORT}

# ENTRYPOINT [ "/bin/ash" ]

RUN apk update && apk upgrade && apk add tar xz
RUN npm -g i npm

RUN adduser -u ${UID} -h /app_cache -s /sbin/nologin -D -G nogroup ${USER} && \
    mkdir -pv /app && \
    chown ${UID} /app
COPY --chown=${UID} --from=build /app/wrk/app.tar.xz /

USER ${UID}
RUN tar xvf app.tar.xz -C /app
WORKDIR /app
RUN npm install

FROM install as run
USER ${UID}
WORKDIR /app

ENTRYPOINT [ "/bin/ash" ]
# ENTRYPOINT [ "npm" "start" ]
