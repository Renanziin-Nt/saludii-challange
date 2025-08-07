import React from 'react'

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material'

import { useQuery } from '@redwoodjs/web'

import { GET_CATEGORIES } from 'src/graphql/category'

const CategoryFilter = ({ value, onChange }) => {
  const { data, loading, error } = useQuery(GET_CATEGORIES)

  const categories = data?.categories || []

  return (
    <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
      <InputLabel id="category-filter-label">Categoria</InputLabel>
      <Select
        labelId="category-filter-label"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        label="Categoria"
        sx={{
          minHeight: 64,
          fontSize: '1.1rem',
          px: 2,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <MenuItem value="">Todas</MenuItem>
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={20} />
          </MenuItem>
        ) : error ? (
          <MenuItem disabled>Erro ao carregar</MenuItem>
        ) : (
          categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}

export default CategoryFilter
