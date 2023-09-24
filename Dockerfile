FROM node:latest as base-node

LABEL maintainer="heart<7362469@qq.com>"

WORKDIR /usr/nest-rbac

COPY . .

RUN rm -rf node_modules

RUN npm config set registry https://registry.npm.taobao.org

RUN npm i

RUN npm run build

RUN cp ./app.production.yaml ./dist/app.production.yaml

EXPOSE 30001

CMD npm run start:prod:rbac