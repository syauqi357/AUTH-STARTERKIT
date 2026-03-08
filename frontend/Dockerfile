FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# serve static files
RUN npm install -g serve

EXPOSE 5125

CMD ["serve", "-s", "build", "-l", "5125"]