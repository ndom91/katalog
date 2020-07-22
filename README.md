# 📦 Katalog

All in one Warehouse / Inventory Management Application

## Screenshots

<img src="https://imgur.com/VwGuhzz.png" alt="Screenshot Dashboard" height="450" />

## Features

- Next.js
- Prisma2
- Nexus GraphQL
- AntD
- Export to CSV
- Create Barcodes / QR Code Sheet
- Includes tracking of all Datev fields from the link in notes.

### 🚀 Getting Started

1. Clone repo `git clone https://github.com/ndom91/lagerify`
2. Install dependencies `cd lagerify && npm i`
3. Generate Prisma Client / Nexus `npm run generate`
4. Develop!

### 🗄️ Updating the DB / Schema

1. Update `/prisma/schema.prisma`
2. Update `/src/graphql/schema.ts`
3. Run `npm run generate`
4. Run `npm run prisma:migrate:up`
5. Run `npm run prisma:migrate:save`

### 👋 Contributing

All contributions are welcome!

### 👋 Notes

Based upon [prisma-examples/graphql-nextjs](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-nextjs).  
Datev Fields - [Source](https://www.datev.de/dnlexom/client/app/index.html#/document/9211235)  
Prisma2 [Docs](https://www.prisma.io/docs/reference)

### 🗒️ License

MIT
