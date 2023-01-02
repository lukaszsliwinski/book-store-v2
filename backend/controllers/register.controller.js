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
};

module.exports = register;
