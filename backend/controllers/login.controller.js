const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');


const login = (request, response) => {
  User
    .findOne({ username: request.body.username })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: 'wrong password',
              error
            });
          };

          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
            },
            'RANDOM-TOKEN',
            { expiresIn: '24h' }
          );

          response.status(200).send({
            message: "Successfully logged in!",
            username: user.username,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: 'wrong password',
            error
          });
        });
    })
    .catch((error) => {
      response.status(404).send({
        message: 'user not found',
        error
      });
    });
};

module.exports = login;
