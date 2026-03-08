FROM node:20-alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache postgresql-client

RUN ls -la

RUN npm install

EXPOSE 3000

CMD ["sh", "-c", "until pg_isready -h db -p 5432; do echo 'Waiting for DB...'; sleep 2; done && sleep 2 && npx drizzle-kit migrate && npx tsx src/server.ts"]