FROM node:lts-alpine

WORKDIR /app
COPY package*.json /

RUN npm ci
COPY main.js /

ENV NODE_ENV=production
CMD ["node", "main.js"]
