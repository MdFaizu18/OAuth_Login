import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import Header from './Header';

const Home = () => {
    const imageUrls = [
        'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        // 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google.png/320px-Google.png',
        // 'https://www.google.com/images/branding/product/ico/googleg_lodp.ico'
    ];

    return (
        <>
            <Header/>
            <Container maxWidth="md" sx={{ mt: 10 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to My Home Page
                </Typography>
                <Typography variant="body1" paragraph>
                    This is a sample home page displaying some Google images and content. You can add more content here to describe your application.
                </Typography>
                <Grid container spacing={2}>
                    {imageUrls.map((url, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                                component="img"
                                src={url}
                                alt={`Google image ${index + 1}`}
                                sx={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default Home;

