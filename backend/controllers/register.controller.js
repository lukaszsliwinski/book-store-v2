const bcrypt = require('bcrypt');

const User = require('../models/user.model');

const register = (req, res) => {
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
            message: 'account successfully created',
            result
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            res.status(422).send({
              message: 'account already exist',
              err
            });
          } else {
            res.status(500).send({
              message: 'error creating account',
              err
            });
          };
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'password was not hashed successfully',
        err
      });
    });
};

module.exports = register;
