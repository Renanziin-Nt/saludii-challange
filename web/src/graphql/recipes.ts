import gql from 'graphql-tag'

export const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      id
      title
      slug
      likes {
        id
      }
      category {
        name
      }
      tags {
        tag {
          name
        }
      }
      userName
    }
  }
`

export const LIKE_RECIPE_MUTATION = gql`
  mutation LikeRecipe($recipeId: Int!, $userId: String!) {
    likeRecipe(recipeId: $recipeId, userId: $userId) {
      id
      recipe {
        id
      }
      isLiked
    }
  }
`


export const RECIPES_QUERY = gql`
  query Recipes($categoryId: Int, $tagId: Int) {
    recipes(categoryId: $categoryId, tagId: $tagId) {
      id
      title
      slug
      ingredients
      instructions
      prepTime
      servings
      personalNote
      likes {
        id
      }
      category {
        name
      }
      tags {
        tag {
          name
        }
      }
    }
  }
`


export const GET_RECIPE_BY_ID = gql`
  query GetRecipeById($id: Int!) {
    recipe(id: $id) {
      id
      title
      ingredients
      instructions
      prepTime
      servings
      personalNote
      likes {
        id
      }
    }
  }
`

export const GET_RECIPE_QUERY = gql`
  query GetRecipe($id: Int!) {
    recipe(id: $id) {
      id
      title
      ingredients
      instructions
      prepTime
      servings
      personalNote
      category {
        name
      }
      userName
      createdAt
      likes {
        id
      }
    }
  }
`
