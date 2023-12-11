FROM node:20.9-alpine as build

# Le port d'écoute du serveur
ARG SERVER_PORT=3000
ENV SERVER_PORT=${SERVER_PORT}

# L'utilisateur de la base de données
ARG PG_USERNAME=postgres
ENV PG_USERNAME=${PG_USERNAME}

# Le mot de passe de la base de données
ARG PG_PASSWORD=root
ENV PG_PASSWORD=${PG_PASSWORD}

# Le
ARG PG_HOST=localhost
ENV PG_HOST=${PG_HOST}

# Le port d'écoute de la base de données
ARG PG_PORT=5432
ENV PG_PORT=${PG_PORT}

# Le nom de la base de données
ARG PG_DATABASE=msReseauTrans
ENV PG_DATABASE=${PG_DATABASE}

EXPOSE $SERVER_PORT

WORKDIR /app

COPY package*.json ./

RUN npm i;npm cache clean --force

COPY . .

RUN chmod u+x /app/script.sh; /bin/sh /app/script.sh; rm -rf /app/script.sh

RUN npm run build

CMD ["/bin/sh", "-c", "npx prisma generate;npm run start:prod"]



