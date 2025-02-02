import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import fetch from 'node-fetch';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signIn.js';
import handleProfileGet from './controllers/profileGet.js';
import handleGetImage from './controllers/image.js'
import handleGetFace from './controllers/detectFace.js';


const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: '',
      password: 'your_database_password',
      database: 'smart-brain',
    },
  });

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Root route for testing
app.get('/', (req, res) => {
    res.json('success');
});

// Sign-in route
app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt)})

// Register route
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })

// Profile route
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db)})

// Image entries update route
app.put('/image', (req, res) => { handleGetImage(req, res, db)})

// Clarifai API proxy route
app.post('/clarifai', (req, res) => { handleGetFace(req, res, db)})

// Start the server
app.listen(3000, () => {
    console.log('App is running on port 3000');
});