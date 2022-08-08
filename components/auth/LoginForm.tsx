import { TextField } from '@mui/material'
import React, { useState } from 'react'
import BtnLogin from './BtnLogin'

const LoginForm = ({ provider, csrfToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <BtnLogin
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      provider={provider}
      csrfToken={csrfToken as string}
      options={{ redirect: false, username: username, password }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
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
    </BtnLogin>
  )
}

export default LoginForm;
