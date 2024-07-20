import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Home, Dashboard, Person } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import logo from '../assets/react.svg';
import axios from 'axios';

const Header = () => {
    const [userData, setUserData] = useState({});

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/login/success', { withCredentials: true });
            console.log("response: ", response);
            setUserData(response.data.user);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    const logout = ()=>{
        window.open('http://localhost:5000/logout','_self');
    }


    return (
        <AppBar position="static" sx={{ background: 'black' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="google auth">
                    <GoogleIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    OAuth Google
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/" startIcon={<Home />}>
                        Home
                    </Button>

                    {
                        Object.keys(userData).length > 0 ?
                            (
                                <>
                                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                        <Person sx={{ mr: 1 }} />
                                        <Typography variant="body1" color="inherit">
                                            {userData.displayName}
                                        </Typography>
                                    </Box>
                                    <Button color="inherit" component={Link} to="/dashboard" startIcon={<Dashboard />}>
                                        Dashboard
                                    </Button>
                                    <Button color="inherit" onClick={logout} startIcon={<Dashboard />}>
                                        Logout
                                    </Button>
                                    <IconButton edge="end" color="inherit" aria-label="logo">
                                        <img src={userData.image} alt="logo" style={{ height: '40px' ,borderRadius:'20px'}} />
                                    </IconButton>
                                </>
                            ) : (
                                <Button color="inherit" component={Link} to="/login" startIcon={<Person />}>
                                    Login
                                </Button>
                            )
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
