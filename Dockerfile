FROM node:18-alpine AS build

WORKDIR /opt/frontend/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /opt/frontend/dist/tripcrafter-frontend /usr/share/nginx/html

EXPOSE 3000
