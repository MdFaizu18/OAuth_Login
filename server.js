import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-google-oauth2';
import * as dotenv from 'dotenv';
import userSchema from './models/userSchema.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true // Allow cookies to be sent with requests
}));

// Setting up the session by our own secret key
app.use(session({
    secret: "12345abcde",
    resave: false,
    saveUninitialized: true
}));

// Setting up passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            try {
                // Use let because we are reassigning the variable
                let user = await userSchema.findOne({ googleId: profile.id });
                if (!user) {
                    user = new userSchema({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        })
);

passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize only the user ID
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userSchema.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Initialize Google Auth login
app.get('/auth/login', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/dashboard',
    failureRedirect: 'http://localhost:5173/login'
}));

// for getting user details 
app.get('/login/success',(req,res)=>{
    // console.log("reqqqqq",req.user);
    if(req.user){
        res.status(200).json({message:"User authenticated",user:req.user});
    }else{
        res.status(401).json({message:"User not authenticated"});
    }
});

// for logout routes 
app.get('/logout',(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect('http://localhost:5173/');
    });
})

const port = 5000;
app.listen(port, async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);  // Connect to MongoDB
        console.log(`Server is running on port ${port}`);
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
});
