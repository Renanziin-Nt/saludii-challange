import { gql } from 'apollo-server-express';

export const schema = gql`
  type Tag {
    id: Int!
    name: String!
    recipes: [RecipeTag!]!
  }

  type Query {
    tags: [Tag!]! @skipAuth
  }

  type Mutation {
    createTag(name: String!): Tag! @skipAuth
  }
`;