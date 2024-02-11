FROM --platform=linux/amd64 node:alpine
WORKDIR /app
COPY package.json .
RUN npm install 

COPY . .
EXPOSE 4014
CMD npm run start