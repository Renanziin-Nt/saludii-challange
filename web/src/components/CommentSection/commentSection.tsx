import React, { useState } from 'react'
import { useQuery, useMutation } from '@redwoodjs/web'
import { CREATE_COMMENT, GET_COMMENTS } from 'src/graphql/comments'
import {
  Box, TextField, Button, Typography, CircularProgress
} from '@mui/material'

const CommentSection = ({ recipeId }) => {
  const { data, loading, error, refetch } = useQuery(GET_COMMENTS, {
    variables: { recipeId },
  })

  const [comment, setComment] = useState('')
  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      setComment('')
      refetch()
    },
  })

  const handleSubmit = () => {
    if (comment.trim() === '') return
    const userName = localStorage.getItem('username') || 'Anônimo'

    createComment({
      variables: {
        input: {
          recipeId,
          content: comment,
          userName,
        },
      },
    })
  }

  if (loading) return <CircularProgress size={20} />
  if (error) return <Typography>Erro ao carregar comentários</Typography>

  return (
    <Box mt={2}>
      <Typography variant="subtitle1">Comentários</Typography>
      <Box display="flex" gap={1} my={2}>
        <TextField
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Adicione um comentário..."
        />
        <Button variant="contained" onClick={handleSubmit}>
          Comentar
        </Button>
      </Box>
      {data.commentsByRecipe.map((c) => (
        <Box key={c.id} my={1}>
          <Typography variant="body2">
            <strong>{c.userName || 'Anônimo'}:</strong> {c.content}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default CommentSection
