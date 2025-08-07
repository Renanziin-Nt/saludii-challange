import { useParams } from '@redwoodjs/router'
import { useQuery, useMutation } from '@redwoodjs/web'
import { Box, CircularProgress, Container, Typography, Paper, Divider, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Markdown from 'react-markdown'
import CommentSection from 'src/components/CommentSection/commentSection'
import { GET_RECIPE_QUERY } from 'src/graphql/recipes'
import { LIKE_RECIPE_MUTATION } from 'src/graphql/recipes'
import { useEffect, useState } from 'react'

const RecipePage = () => {
  const { id } = useParams()
  const { data, loading, error, refetch } = useQuery(GET_RECIPE_QUERY, {
    variables: { id: parseInt(id) },
  })

  const [liked, setLiked] = useState(false)
  const [likeRecipe] = useMutation(LIKE_RECIPE_MUTATION)


  const userId = localStorage.getItem('userId') || generateUserId()
  console.log('User ID:', userId)

  function generateUserId() {
    const id = `user-${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('userId', id)
    return id
  }

  useEffect(() => {
    if (data?.recipe) {
      const userHasLiked = data.recipe.likes.some(
        (like) => like.userId === userId
      )
      setLiked(userHasLiked)
    }
  }, [data, userId])

  const handleLike = async () => {
    try {
      const { isLiked } = await likeRecipe({
        variables: { recipeId: parseInt(id), userId },
      })

      setLiked(isLiked)
      refetch()
    } catch (error) {
      console.error('Error liking the recipe:', error)
      alert('Error liking the recipe: ' + error.message)
    }
  }


  if (loading) return <CircularProgress />
  if (error) return <Typography color="error">Error: {error.message}</Typography>

  const recipe = data.recipe

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h3" gutterBottom>
          {recipe.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          By: {recipe.userName || 'Unknown'} | Category: {recipe.category.name}
        </Typography>
        <Typography variant="body2" gutterBottom color="text.secondary">
          ⏱️ {recipe.prepTime} | 🍽️ {recipe.servings} servings
        </Typography>

        <Box sx={{ mt: 2 }}>
          <IconButton
            color={liked ? 'secondary' : 'primary'}
            onClick={handleLike}
          >
            <FavoriteIcon />
          </IconButton>
          <Typography variant="body2">{recipe.likes.length}</Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default RecipePage
