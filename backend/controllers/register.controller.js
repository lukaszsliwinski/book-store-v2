const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

const userSchema = new passwordValidator();
userSchema
  .is().min(3)
  .is().max(30)
  .has().not().spaces()

const passwordSchema = new passwordValidator();
passwordSchema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces()

const register = (req, res) => {
  if (!userSchema.validate(req.body.username)) {
    res.status(400).send({
      item: 'username',
      message: 'incorrect username format'
    });
  } else if (!passwordSchema.validate(req.body.password)) {
    console.log('handle incorrect password format')
    res.status(400).send({
      item: 'password',
      message: 'incorrect password format'
    });
  } else {
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
                item: 'username',
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
};

module.exports = register;
