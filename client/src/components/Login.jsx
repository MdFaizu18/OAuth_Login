import React from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Header from './Header';

const Login = () => {
    const loginWithGoogle = ()=>{
        window.open("http://localhost:5000/auth/google/callback","_self");
    }
    return (
      <>
      <Header/>
            <Container maxWidth="sm">
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 8,
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        required
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        required
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button variant="contained" color="primary" sx={{ mt: 2, mb: 2 }} fullWidth>
                        Login
                    </Button>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Not registered?{' '}
                        <Link href="/create-account" variant="body2">
                            Create an account
                        </Link>
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        sx={{ mb: 2, background: 'green', '&:hover': { background: 'green' }}}
                        fullWidth
                        onClick={loginWithGoogle}
                    >
                        Sign in with Google
                    </Button>
                </Box>
            </Container>
      </>
    );
};

export default Login;
