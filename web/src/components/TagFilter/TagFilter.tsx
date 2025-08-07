import React from 'react'
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material'
import { useQuery } from '@redwoodjs/web'

import { GET_TAGS } from 'src/graphql/tags'

const TagFilter = ({ value, onChange }) => {
  const { data, loading, error } = useQuery(GET_TAGS)

  const tags = data?.tags || []

  return (
    <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
      <InputLabel id="tag-filter-label">Tag</InputLabel>
      <Select
        labelId="tag-filter-label"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        label="Tag"
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
          tags.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              {tag.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}

export default TagFilter
