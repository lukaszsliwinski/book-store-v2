// required dependencies
const path = require('path');
const express = require('express');
const bp = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

app.post('/login', (req, res) => {
  User
    .findOne({ username: req.body.username })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return res.status(400).send({
              message: 'wrong password',
              err
            });
          };

          const token = jwt.sign(
            {
              userId: user._id,
              userName: user.username,
            },
            'RANDOM-TOKEN',
            { expiresIn: '24h' }
          );

          res.status(200).send({
            message: "login successful",
            username: user.username,
            token,
          });
        })
        .catch((err) => {
          res.status(400).send({
            message: 'wrong password',
            err
          });
        });
    })
    .catch((err) => {
      res.status(404).send({
        message: 'user not found',
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