import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Stack,
} from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import { useMutation, useQuery } from '@redwoodjs/web'

import { GET_CATEGORIES } from 'src/graphql/category'
import { GET_TAGS } from 'src/graphql/tags'
import { CREATE_RECIPE_MUTATION } from 'src/graphql/recipes'

const RecipeForm = ({ onCreated }) => {
  const [title, setTitle] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [servings, setServings] = useState(0)
  const [personalNote, setPersonalNote] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [tagId, setTagId] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')

  const [createRecipe] = useMutation(CREATE_RECIPE_MUTATION)
  const { data: categoryData, loading: categoryLoading } = useQuery(GET_CATEGORIES)
  const { data: tagData, loading: tagLoading } = useQuery(GET_TAGS)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createRecipe({
      variables: {
        input: {
          title,
          ingredients,
          instructions,
          prepTime,
          servings,
          personalNote,
          slug: title.toLowerCase().replace(/\s+/g, '-'),
          categoryId: parseInt(categoryId),
          tagIds: tagId ? [parseInt(tagId)] : [],
          userName: localStorage.getItem('username'),
        },
      },
    })

    if (onCreated) onCreated()
  }

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 520,
          p: 4,
          borderRadius: 4,
          bgcolor: '#fff',
        }}
      >
        <Typography variant="h5" align="center" mb={3}>
          👨‍🍳 Create New Recipe
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Recipe Title"
              variant="standard"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Category Select */}
            <FormControl variant="standard" fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categoryLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  categoryData?.categories.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            {/* Tag Select */}
            <FormControl variant="standard" fullWidth>
              <InputLabel id="tag-label">Tag</InputLabel>
              <Select
                labelId="tag-label"
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
              >
                {tagLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  tagData?.tags.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <TextField
              label="Preparation Time"
              variant="standard"
              fullWidth
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
            />

            <TextField
              label="Servings"
              variant="standard"
              type="number"
              fullWidth
              inputProps={{ min: 1 }}
              value={servings}
              onChange={(e) => setServings(parseInt(e.target.value, 10))}
            />

            <Box data-color-mode="light">
              <Typography variant="subtitle1" mb={1}>
                Ingredients
              </Typography>
              <MDEditor
                value={ingredients}
                onChange={setIngredients}
                height={200}
                visiableDragbar={false}
              />
            </Box>

            <Box data-color-mode="light">
              <Typography variant="subtitle1" mt={3} mb={1}>
                Instructions
              </Typography>
              <MDEditor
                value={instructions}
                onChange={setInstructions}
                height={200}
                visiableDragbar={false}
              />
            </Box>

            <TextField
              label="Personal Note"
              variant="standard"
              fullWidth
              multiline
              rows={3}
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                py: 1.5,
                backgroundColor: '#30c97c',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#28b06c',
                },
              }}
            >
              CREATE RECIPE
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}

export default RecipeForm
