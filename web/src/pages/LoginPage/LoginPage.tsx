import React, { useState } from 'react'
import { navigate } from '@redwoodjs/router'
import { Container, TextField, Button, Typography } from '@mui/material'

const LoginPage = () => {
  const [username, setUsername] = useState('')

  const handleLogin = () => {
    if (username.trim()) {

      if (!localStorage.getItem('userId')) {
        const userId = `user-${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('userId', userId)
      }
      localStorage.setItem('username', username)
      navigate('/')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Bem-vindo ao App de Receitas
      </Typography>
      <TextField
        fullWidth
        label="Digite seu nome/apelido"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button fullWidth variant="contained" onClick={handleLogin}>
        Entrar
      </Button>
    </Container>
  )
}

export default LoginPage
