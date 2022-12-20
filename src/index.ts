import 'reflect-metadata'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import SchemaBuilder from '@pothos/core'
import { buildSchema } from 'type-graphql'
import { mergeSchemas } from '@graphql-tools/schema'
import { buildTypeGQLSchema } from './type-gql'
import { buildPothosSchema } from './pothos'

const runAsync = async () => {
  const yoga = createYoga({
    schema: mergeSchemas({
      schemas: [await buildTypeGQLSchema(), buildPothosSchema()],
    }),
  })

  const server = createServer(yoga)

  server.listen(5005, () => {
    console.log('Visit http://localhost:5005/graphql')
  })
}

runAsync()
