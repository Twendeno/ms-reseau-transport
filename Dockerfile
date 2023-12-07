FROM node:20.9 as build
EXPOSE 3000
EXPOSE 5000

WORKDIR /app

COPY package*.json ./

RUN npm i;npm cache clean --force

COPY . .

RUN npm run build

ENTRYPOINT ["/bin/bash", "-c", "npx prisma generate;npm run start:prod "]



