FROM node:20.10.0-alpine

RUN apk update && \
apk add openssl && \
apk add openssl-dev && \
apk add libc6-compat && \
apk add curl && \
apk add wget && \
apk add git

ENV HOME=/usr/src/app

WORKDIR ${HOME}

COPY package.json ./
COPY package-lock.json ./

RUN npm i

USER root

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

COPY . .

RUN npm install -g @nestjs/cli

EXPOSE 3333

CMD /wait && \
  npm i && \
  npx prisma migrate dev && \
  npx prisma db seed && \
  npm run start:dev