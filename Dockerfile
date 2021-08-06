FROM node:alpine

WORKDIR /app
COPY . .

RUN npm install\
    && npm install typescript -g\
    && npm install ts-node-dev -g

RUN tsc
CMD ["npm", "start"]