FROM node:16-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install -g npm@8.19.2
RUN npm install
USER node
RUN node -v
COPY --chown=node:node . .
EXPOSE 3000
CMD npm run start
