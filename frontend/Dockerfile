FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

# RUN npm run build

# serve static files
# RUN npm install -g serve

EXPOSE 5173

CMD ["npx", "vite", "dev", "--host", "0.0.0.0", "--port", "5173"]