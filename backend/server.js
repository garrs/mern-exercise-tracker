// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import exercisesRouter from './routes/exercises.js'
import usersRouter from  './routes/users.js'

// require('dotenv').config();

const app = express();
dotenv.config()

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// const uri = process.env.ATLAS_URI;

mongoose.connect('mongodb+srv://koolook619:xCjJknVC4bxC5no5@cluster0.9loo9.mongodb.net/test?retryWrites=true&w=majority '
, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});