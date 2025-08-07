import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, Grid, TextField, Paper } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'
import { navigate } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import CategoryFilter from 'src/components/CategoryFilter/CategoryFilter'
import RecipeCard from 'src/components/RecipeCard/RecipeCard'
import RecipeForm from 'src/components/RecipeForm/RecipeForm'
import TagFilter from 'src/components/TagFilter/TagFilter'
import { RECIPES_QUERY } from 'src/graphql/recipes'
import 'react-toastify/dist/ReactToastify.css'
import io from 'socket.io-client'
const socket = io('http://localhost:3001')

const HomePage = () => {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(null)
  const [tag, setTag] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      navigate('/login')
    }
  }, [])

  const { data, loading, refetch } = useQuery(RECIPES_QUERY, {
    variables: {
      categoryId: category ? parseInt(category) : null,
      tagId: tag ? parseInt(tag) : null,
    },
  })

  useEffect(() => {
    if (data?.recipes) {
      setRecipes(data.recipes)
    }
  }, [data])

  useEffect(() => {
    refetch({
      categoryId: category ? parseInt(category) : null,
      tagId: tag ? parseInt(tag) : null,
    })
  }, [category, tag, refetch])

  useEffect(() => {
  const handleRecipeCreated = (newRecipe) => {
    toast.info(`🍲 New recipe published: ${newRecipe.title}`)
    refetch()
  }

  const handleLikeCreated = () => {
    refetch()
  }

  socket.on('recipeCreated', handleRecipeCreated)
  socket.on('likeCreated', handleLikeCreated)

  return () => {
    socket.off('recipeCreated', handleRecipeCreated)
    socket.off('likeCreated', handleLikeCreated)
  }
}, [refetch])


  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <ToastContainer position="top-right" autoClose={4000} />
      <Typography variant="h3" align="center" gutterBottom>
        🍽️ Recipe App
      </Typography>

      <Box mt={4} mb={5}>
        <RecipeForm onCreated={refetch} />
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <CategoryFilter value={category} onChange={setCategory} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TagFilter value={tag} onChange={setTag} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search Recipes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default HomePage
