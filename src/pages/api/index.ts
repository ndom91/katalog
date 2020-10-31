import { makeSchema } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { ApolloServer } from 'apollo-server-micro'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { Item, Company, Warehouse, Image, Location, Status, Shipment, Mutations, Crud } from '../../graphql/schema'
import path from 'path'

const schema = makeSchema({
  typegenAutoConfig: {
    sources: [
      {
        source: require.resolve('../../graphql/schema.ts'),
        alias: 'types'
      },
      {
				source: '@prisma/client',
				alias: 'prisma',
			},
    ],
    contextType: 'types.Context'
  },
  types: [Item, Company, Warehouse, Image, Location, Status, Shipment, Mutations, Crud],
  plugins: [
    nexusPrisma({
      prismaClient: (ctx) => prisma,
      experimentalCRUD: true,
    }),
  ],
  nonNullDefaults: {
    input: false,
    output: false,
  },
   outputs: {
    typegen: path.join(process.cwd(), 'src', 'graphql', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'src', 'graphql', 'schema.graphql')
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default new ApolloServer({ schema }).createHandler({
  path: '/api',
});
