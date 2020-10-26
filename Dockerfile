FROM node:12.14.1-alpine

WORKDIR /usr/src/test

COPY ["package.json", "package-lock.json", "/usr/src/test/"]
RUN npm install --loglevel=warn --progress=false --porcelain

COPY [".", "/usr/src/test"]

EXPOSE 9000

CMD ["node", "index.js"]
