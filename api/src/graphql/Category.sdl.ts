import { gql } from 'apollo-server-express'

export const schema = gql`
  type Category {
    id: Int!
    name: String!
    recipes: [Recipe!]!
  }

  type Query {
    categories: [Category!]! @skipAuth
  }

  type Mutation {
    createCategory(name: String!): Category! @skipAuth
  }
`
