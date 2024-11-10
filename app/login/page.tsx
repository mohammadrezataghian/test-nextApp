'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import SessionProviderWrapper from '../components/SessionProviderWrapper';

const LoginPage = () => {
    
    const { data: session } = useSession();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
  
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
        callbackUrl:'/'
      });
  
      if (result?.error) {
        setError(result.error); // This will display the error thrown from route.ts
    } else {
        router.push('/');
        router.refresh()
    } 
    //   else {
    //     router.push('/');
    //   }
    };
  
    // if (session) {
    //   return     (
    //     <Container>
    //       <Typography variant="h5">Welcome, {session.user?.username}</Typography>
    //       <Button onClick={() => signOut()}>Log out</Button>
    //     </Container>
    //   );
    // }

  return (
    <>
    <SessionProviderWrapper>
    <div className='w-full h-[100vh] flex justify-center items-center'>
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: '#f5f5f5',
          p: 4,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" align="center" className='select-none'>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Container>
         {/* make a login page by yourself and watch the authentication video using next auth */}
    </div> 
    </SessionProviderWrapper>
    </>
  )
}

export default LoginPage
