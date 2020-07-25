# 📦 Katalog

All in one Warehouse / Inventory Management Application

## 💻 Screenshot

<img src="https://imgur.com/2CbygkP.png" alt="Screenshot Dashboard" height="450" />

## 🥞️ Stack

- Next.js
- Prisma2
- Nexus GraphQL
- AntD

## 🕹️ Features

- Track Items and Locations
- Manage Shipping - inbound and outbound
- Export everything to CSV
- Create QR Codes for all items
- Print QR Code Sheet for real-world tracking
- Scan the code with your phone for quick checkout
- Auth via Email or any OAuth2 provider ([`next-auth`](https://github.com/iaincollins/next-auth))
- Includes all Datev mandated fields (🇩🇪)

## 🚀 Getting Started

1. Clone repo `git clone https://github.com/ndom91/katalog`
2. Install dependencies `cd katalog && npm i`
3. Create your own .env and fill out variables `cp .env.example .env`
4. Setup the database `npm run prisma:migrate:save && npm run prisma:migrate:up`
5. Develop!

### 🗄️ Updating the DB / Schema

1. Update `/prisma/schema.prisma`
2. Update `/src/graphql/schema.ts`
3. Run `npm run db:update`

### 👋 Contributing

All contributions are welcome!

### 📑 Notes

Based on [prisma-examples/graphql-nextjs](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-nextjs).  
Datev Fields [Source](https://www.datev.de/dnlexom/client/app/index.html#/document/9211235)

### 🗒️ License

MIT
