import SchemaBuilder from '@pothos/core'

const builder = new SchemaBuilder<{
  Objects: {
    Person: { id: number; name: string; age: number }
  }
}>({})

builder.objectType('Person', {
  fields: (t) => ({
    id: t.id({ resolve: (parent) => parent.id }),
    name: t.string({ resolve: (parent) => parent.name }),
    age: t.int({ resolve: (parent) => parent.age }),
    // TODO: reference a type from type-graphql that don't exist in pothos but would exist in the merged final `GraphQLSchema`
    // recipe: t.field({ type: 'Recipe', resolve: (parent) => parent.recipe }),
  }),
})

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (_parent, { name }) => `hello, ${name || 'World'}`,
    }),
    person: t.field({
      type: 'Person',
      resolve: () => ({
        id: 1,
        name: 'Yassin Eldeeb',
        age: 18,
      }),
    }),
  }),
})

const buildPothosSchema = () => builder.toSchema()

export { buildPothosSchema }
