
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
