// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

// import { connect } from 'mongoose';
import connectToMongoDB from './db/connectToMongoDB.js';

const app=express();
dotenv.config();
const PORT=process.env.PORT || 5000;

app.use(express.json());  //middleware to parse json payloads and make it available in req.body
app.use(cookieParser());  //middleware to parse cookies from the incoming requests

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);

app.get("/",(req,res)=>{
    res.send("root Route")
})



app.listen(PORT, async () => {
    try {
        await connectToMongoDB();
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
    console.log(`Server Running On PORT ${PORT}`);
});

