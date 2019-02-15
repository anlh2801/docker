FROM node:8
# Create app directory
WORKDIR /usr/src/app
# Bundle app src
COPY . .
# Install app dependencies
RUN npm install
EXPOSE 50000
CMD [ "npm", "start" ]