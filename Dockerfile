FROM node:alpine

WORKDIR /app
COPY . .

RUN npm install\
    && npm install typescript -g\
    && npm install ts-node-dev -g

RUN tsc
# CMD if ["$NODE_ENV" = "development" ] ; then ["ts-node-dev", "--respawn", "--", "src/app.js"]; else ["node", "./dist/app.js"]; fi

CMD ["node", "./dist/app.js"]
# CMD ["ts-node-dev --respawn -- src/app.ts"]