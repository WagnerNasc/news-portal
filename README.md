# News Portal API

This project aims to provide user news posts.

## Running Project

Before running the project, make sure you have the following requirements:

- Node.js: >=20.10.0

1. Install Dependencies:
     ```shell
     npm i
     ```
2. Running application:
     ```shell
     docker compose up -d
     ```
3. Running seed:
     ```shell
     npx prisma db seed
     ```
4. Running application:
     ```shell
     npm run start:dev
     ```