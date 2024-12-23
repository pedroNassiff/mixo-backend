FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 5000

ENV NODE_ENV=production

CMD ["npm", "start"]
