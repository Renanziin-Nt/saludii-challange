import { gql } from 'graphql-tag'

export const GET_COMMENTS = gql`
  query CommentsByRecipe($recipeId: Int!) {
    commentsByRecipe(recipeId: $recipeId) {
      id
      content
      createdAt
      userName
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
    }
  }
`
