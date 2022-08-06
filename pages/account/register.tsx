/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Alert, Box, Button, CircularProgress, Container, Link, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Status
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeout, sto] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      sto(false);
    }, 3000);
  }, []);

  const registerUser = async () => {
    await fetch(`/api/user/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "email": email,
        "password": password,
      })
    })
      .then(async res => {
        const data = await res.json();
        const message = data.message as string;
        return message;
      })
      .then(message => {
        setStatusMessage(message);
        sto(true);
        setIsLoading(false);
      })
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(username, email, password);
    setIsLoading(true);
    await registerUser();
  }

  return (
    <Container component="main" maxWidth="xs">
      <br />
      <Typography align="center" variant="h4">Register</Typography>

      <Box component="form" onSubmit={handleSubmit}>

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          type="email"
          autoFocus
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="password"
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <Stack alignItems="center">
          <Link href="/">
            Go Back
          </Link>
          <Button type="submit" variant="contained" style={{ margin: "1em" }}>
            Sign Up
          </Button>
        </Stack>

        {isLoading ? <Box mt={3}><CircularProgress size={24} /> Loading...</Box> : null}
        {statusMessage !== "" &&
          <Box mt={3}>
            <Alert severity={statusMessage.toLowerCase().includes("success") ? "success" : "error"}>{statusMessage}</Alert>
          </Box>
        }

      </Box>
    </Container>
  );
};

export default RegisterPage;
