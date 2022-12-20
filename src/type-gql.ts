import {
  Field,
  ID,
  ObjectType,
  Query,
  Resolver,
  buildSchema,
} from 'type-graphql'

@ObjectType()
class Recipe {
  @Field((_type) => ID)
  id: string

  @Field()
  title: string
}

@Resolver(Recipe)
class RecipeResolver {
  @Query((_returns) => [Recipe])
  recipes() {
    return [{ id: '1', title: 'Spaghetti' }]
  }
}

const buildTypeGQLSchema = async () =>
  await buildSchema({
    resolvers: [RecipeResolver],
  })

export { buildTypeGQLSchema }
