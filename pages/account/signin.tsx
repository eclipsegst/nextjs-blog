/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react'
import { getProviders, getSession, getCsrfToken, signIn } from 'next-auth/react'
import Router from 'next/router'
import Layout from '../../components/Layout'

import LoginForm from '../../components/auth/LoginForm'
import { Box, Container, Typography, Stack } from '@mui/material';
import { CtxOrReq } from 'next-auth/client/_utils';
import { Provider } from 'next-auth/providers';
import styled from 'styled-components';
import { darkGrey, red } from '../../utils/colors';

import {
  GoogleLoginButton,
  FacebookLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

const MediumText = styled.p`
  margin: 1.5em 0 0.5em;
  font-size: 16px;
  font-weight: 500;
  color: ${darkGrey};
`

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
    <Layout>
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

          <MediumText className="text-center" color=''>Or</MediumText>
        </Box>
        <div>
          {Object.values(providers as Provider[])
            .filter((provider) => provider.name !== "credentials")
            .map((provider) =>
              (() => {
                switch (provider.id) {
                  case "google":
                    return (
                      <GoogleLoginButton onClick={() => void signIn(provider.id)} />
                    )
                  case "github":
                    return (
                      <GithubLoginButton onClick={() => void signIn(provider.id)} />
                    )
                  case "facebook":
                    return (
                      <FacebookLoginButton onClick={() => void signIn(provider.id)} />
                    )
                }
                return null;
              })()
            )}
        </div>
      </Container>
    </Layout>
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
