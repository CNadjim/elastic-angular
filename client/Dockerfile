##### Stage 1

FROM node:10 as node

WORKDIR /client

COPY . .

# install yarn
RUN npm i yarn

#install packages
# you can change the version of angular CLI to the one you are using in your application
RUN yarn global add @angular/cli@latest
RUN yarn install

# if you have libraries in your workspace that the angular app relies on, build them here

#RUN ng build library-name --prod

# build your application
RUN ng build --prod

# STAGE 2
# Deploy APP

# In this stage, we are going to take the build artefacts from stage one and build a deployment docker image
# We are using nginx:alpine as the base image of our deployment image

FROM nginx:alpine

COPY --from=node /client/dist/elastic-angular /usr/share/nginx/html
COPY --from=node /client/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
