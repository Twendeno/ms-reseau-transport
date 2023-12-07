
# Ms reseau transport API
## Description


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## DEV
```bash
# install prisma en Dev 
$ npm i -D prisma 

# Voir toutes les commande 
$ npx prisma 

# Init prisma
$ npx prisma init

# Prisma studio
$ npx prisma studio

# Migration prisma sans nom
$ npx prisma migrate dev 

# Migration prisma avec nom
$ npx prisma migrate dev --name init

# Generer un module
$ nest g mo <name>

# Generer un controller
$ nest g co <name>

# Generer un service
$ nest g s <name>

# Installer les validateurs et transformateurs de classe
$ npm i class-transformer class-validator

# Installer prisma client
$ npm i @prisma/client

# Installer le module de gestion des valeurs d'environnement
npm i @nestjs/config


```

## Modification apporté dans la configuration de nestjs
|   Fichier     |    Ligne  |  Avant   |  Après   |
|   ---    |   ---     |   ---    |   ---    |
|   .eslintrc   |    18 |  ignorePatterns: ['.eslintrc.js']    |   ignorePatterns: ['.eslintrc.js',"*"]    |

## Comment demarrer le projet avec docker 

### Pre-requis
- Docker
- Docker-compose
- Postgres

### Etapes
```bash
# 1. Cloner le projet
$ git clone

# 2. demarrer postgres

# 3. Creer une base de donnee avec le nom "msReseauTrans"

# 4. executer la commande suivante une fois dans le dossier du projet 
# Sans argument de configuration
$ docker build -t ms-reseau-transport:latest .

# Avec argument de configuration

# Liste des arguments:
# SERVER_PORT : port sur lequel le serveur va ecouter
# PG_USERNAME : nom d'utilisateur de la base de donnee
# PG_PASSWORD : mot de passe de la base de donnee
# PG_HOST : host de la base de donnee
# PG_PORT : port de la base de donnee
# PG_DATABASE : nom de la base de donnee

$ docker build -t ms-reseau-transport:latest --build-arg SERVER_PORT=3000  --build-arg PG_USERNAME=postgres --build-arg PG_PASSWORD=root  --build-arg PG_HOST=localhost --build-arg PG_PORT=postgres --build-arg PG_DATABASE=msReseauTrans  .

# 5. Ouvrier le navigateur et aller sur l'url suivante
# http://localhost:3000/healt
```