/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react'
import { getProviders, getSession, getCsrfToken, signIn } from 'next-auth/react'
import Router from 'next/router'

import LoginForm from '../../components/auth/LoginForm'
import { Box, Container, Typography } from '@mui/material';
import { CtxOrReq } from 'next-auth/client/_utils';
import { Provider } from 'next-auth/providers';

const Login = ({ providers, session, csrfToken }) => {

  useEffect(() => {
    if (session) {
      void Router.push("/");
    }
  }, [session])

  useEffect(() => {
    if (Router.query.error) {
      void Router.push('/');
    }
  }, [])

  if (session) return null;
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">Sign in</Typography>
        <LoginForm provider={providers.credentials}
          csrfToken={csrfToken as string} />
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p className="text-center">Or Login with</p>
        {Object.values(providers as Provider[])
          .filter((provider) => provider.name !== "credentials")
          .map((provider) => (
            <div key={provider.name}>
              <button onClick={() => void signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </Box>
    </Container>
  )
}

export async function getServerSideProps(context: CtxOrReq) {
  return {
    props: {
      providers: await getProviders(),
      session: await getSession(context),
      csrfToken: await getCsrfToken(context)
    }
  }
}

export default Login
