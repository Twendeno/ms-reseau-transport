FROM node:20.9-alpine AS builder

# Create app directory
WORKDIR /app

# Le port d'écoute du serveur
ARG SERVER_PORT=3000
ENV SERVER_PORT=${SERVER_PORT}

# L'utilisateur de la base de données
ARG PG_USERNAME=postgres
ENV PG_USERNAME=${PG_USERNAME}

# Le mot de passe de la base de données
ARG PG_PASSWORD=root
ENV PG_PASSWORD=${PG_PASSWORD}

# Le dns
ARG PG_HOST=localhost
ENV PG_HOST=${PG_HOST}

# Le port d'écoute de la base de données
ARG PG_PORT=5432
ENV PG_PORT=${PG_PORT}

# Le nom de la base de données
ARG PG_DATABASE=msReseauTrans
ENV PG_DATABASE=${PG_DATABASE}

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY script.sh ./script.sh

RUN chmod u+x /app/script.sh; /bin/sh /app/script.sh; rm -rf /app/script.sh
# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:20.9-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
