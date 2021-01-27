import { makeSchema } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { ApolloServer } from 'apollo-server-micro'
import { PrismaClient } from '@prisma/client'
import {
  Item,
  Company,
  Warehouse,
  Image,
  Location,
  Status,
  Shipment,
  Mutations,
  Crud,
} from './schema'
import path from 'path'

const prisma = new PrismaClient()
console.log(process.env)

const schema = makeSchema({
  typegenAutoConfig: {
    sources: [
      {
        source: require.resolve('./schema.ts'),
        alias: 'types',
      },
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
    ],
    contextType: 'types.Context',
  },
  types: [
    Item,
    Company,
    Warehouse,
    Image,
    Location,
    Status,
    Shipment,
    Mutations,
    Crud,
  ],
  plugins: [
    nexusPrisma({
      prismaClient: ctx => ctx.prisma = prisma,
      experimentalCRUD: true,
    }),
  ],
  // nonNullDefaults: {
  //   input: false,
  //   output: false,
  // },
  outputs: {
    // typegen: path.join(
    //   process.cwd(),
    //   'src',
    //   'pages',
    //   'api',
    //   'nexus-typegen.ts',
    // ),
    schema: path.join(process.cwd(), 'src', 'pages', 'api', 'schema.graphql'),
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default new ApolloServer({ schema }).createHandler({
  path: '/api',
})
