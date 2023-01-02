const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');


const login = (req, res) => {
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
};

module.exports = login;
