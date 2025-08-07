import { gql } from 'apollo-server-express';
export const schema = gql`
  type Comment {
    id: Int!
    content: String!
    createdAt: DateTime!
    recipeId: Int!
    recipe: Recipe!
    userName: String
  }

  input CreateCommentInput {
    content: String!
    recipeId: Int!
    userName: String
  }

  type Query {
    commentsByRecipe(recipeId: Int!): [Comment!]! @skipAuth
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
  }
`
