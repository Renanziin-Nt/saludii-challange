import { gql } from 'apollo-server-express';

export const schema = gql`
  type Like {
    id: Int!
    recipe: Recipe!
    createdAt: DateTime!
  }

  type Query {
    likes: [Like!]! @skipAuth
  }
`;