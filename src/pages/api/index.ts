import { makeSchema } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { ApolloServer } from 'apollo-server-micro'
import { Item, Company, Warehouse, Image, Location, Status, Shipment, Mutations, Crud } from '../../graphql/schema'
import path from 'path'

const schema = makeSchema({
  // typegenAutoConfig: {
  //   sources: [
  //     {
  //       source: require.resolve('../../../node_modules/.prisma/client/index.d.ts'),
  //       alias: 'prisma',
  //     },
  //     {
  //       source: require.resolve('../../graphql/context.ts'),
  //       alias: 'ContextModule'
  //     }
  //   ],
  //   contextType: 'ContextModule.Context'
  // },
  types: [Item, Company, Warehouse, Image, Location, Status, Shipment, Mutations, Crud],
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
   outputs: {
    typegen: path.join(process.cwd(), 'src', 'pages', 'api', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'src', 'pages', 'api', 'schema.graphql')
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
