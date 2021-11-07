FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY boseremote/ ./boseremote/
RUN cd boseremote && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/boseremote/build ./boseremote/build
COPY boseApi/package*.json ./boseApi/
RUN cd boseApi && npm install
COPY boseApi/bin/www ./boseApi/

EXPOSE 2023

CMD ["node", "./boseApi/bin/www"]
