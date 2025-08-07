import { Card, CardContent, Typography, IconButton, Stack } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { LIKE_RECIPE_MUTATION } from 'src/graphql/recipes'

interface RecipeCardProps {
  recipe: {
    id: number
    title: string
    prepTime: string
    servings: number
    userName?: string
    category: { name: string }
    likes: { id: number }[]
  }
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [likeRecipe] = useMutation(LIKE_RECIPE_MUTATION)

  const handleLike = async () => {
    await likeRecipe({ variables: { recipeId: recipe.id } })
  }

  return (
    <Card
      sx={{
        width: 250,
        minHeight: 180,
        m: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: '0.3s',
        ':hover': { boxShadow: 6 },
      }}
      onClick={() => navigate(`/recipe/${recipe.id}`)}
    >
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          {recipe.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          ⏱️ {recipe.prepTime} | 🍽️ {recipe.servings}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          🏷️ {recipe.category.name}
        </Typography>

        {recipe.userName && (
          <Typography variant="caption" color="text.secondary">
            By {recipe.userName}
          </Typography>
        )}
      </CardContent>

      <Stack direction="row" alignItems="center" justifyContent="space-between" px={2} pb={2}>
        <IconButton size="small" color="primary" onClick={handleLike}>
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2">{recipe.likes.length}</Typography>
      </Stack>
    </Card>
  )
}

export default RecipeCard
