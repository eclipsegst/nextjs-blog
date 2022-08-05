import React, { useState } from 'react';
import { signIn, SignInOptions } from 'next-auth/react';
import Loading from '../Loading';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const BtnLogin = ({ children, provider, csrfToken, options }) => {
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const providerId = provider.id as string

  const handleSubmit = async (e) => {
  // const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setLoading(true)
    console.log("inx")
    console.log(options)
    const res = await signIn("credentials", (options as SignInOptions))
    setLoading(false)

    if (providerId === "credentials") {
      if (res.error) {
        console.log("inx error")
        console.log(res)
        return toast.error(res.error)
      }
      toast.success("Successfully login...");
      setTimeout(() => {
        void Router.push("/");
        window.location.reload();
      }, 3000);
      return;
    }
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Box component="form" onSubmit={handleSubmit}>
      <ToastContainer />
      <input type="hidden" name="csrfToken" defaultValue={csrfToken as string} />

      {children}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign in with {providerId}
      </Button>

      {loading && <Loading />}

      <Grid container>
        <Grid item xs>
          {
            <Link href="/" variant="body2">
              Go Back
            </Link>
          }
        </Grid>
        <Grid item>
          <Link href="/account/register/" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BtnLogin
