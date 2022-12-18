// required dependencies
const path = require('path');
const express = require('express');
const bp = require('body-parser');
const bcrypt = require('bcrypt');

const dbConnect = require('./db/dbConnect');
const User = require('./db/userModel');

const app = express();

// dotenv package
require('dotenv').config();

// port number
const PORT = process.env.PORT || 3001;

// environment
const NODE_ENV = process.env.NODE_ENV;

// middleware
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.post('/register', (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedPassword
      });

      user
        .save()
        .then((result) => {
          res.status(201).send({
            message: 'user successfully created',
            result
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: 'error creating user',
            err
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'password was not hased successfully',
        err
      });
    });
});

// execute database connection
dbConnect();

// run server
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}\nenv: ${NODE_ENV}`);
});