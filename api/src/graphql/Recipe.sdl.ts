import { gql } from 'apollo-server-express'

export const schema = gql`
  type Category {
    id: Int!
    name: String!
    recipes: [Recipe!]!
  }

  type Tag {
    id: Int!
    name: String!
    recipes: [RecipeTag!]!
  }

  type Like {
    id: Int!
    recipe: Recipe!
    createdAt: DateTime!
    userId: String!
  }

  type RecipeTag {
    recipe: Recipe!
    tag: Tag!
  }

  type Recipe {
    id: Int!
    title: String!
    ingredients: String!
    instructions: String!
    prepTime: String!
    servings: Int!
    personalNote: String
    slug: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    category: Category!
    categoryId: Int!
    tags: [RecipeTag!]!
    likes: [Like!]!
    userName: String
    comments: [Comment!]!
  }

  input CreateRecipeInput {
    title: String!
    ingredients: String!
    instructions: String!
    prepTime: String!
    servings: Int!
    personalNote: String
    slug: String!
    categoryId: Int!
    tagIds: [Int!]
    userName: String
  }

  type Query {
    recipes(categoryId: Int, tagId: Int): [Recipe!]! @skipAuth
    recipe(id: Int!): Recipe @skipAuth
  }

  type LikeResponse {
    isLiked: Boolean!
    id: Int
    recipe: Recipe
  }


  type Mutation {
    createRecipe(input: CreateRecipeInput!): Recipe! @skipAuth
    likeRecipe(recipeId: Int!, userId: String!): LikeResponse! @skipAuth
    createComment(input: CreateCommentInput!): Comment! @skipAuth
  }
`
