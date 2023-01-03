const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

const passwordSchema = new passwordValidator();
passwordSchema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces()

const changePassword = async (req, res) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).send({
      message: 'incorrect password format'
    });
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        User
          .findOneAndUpdate(
            {username: res.locals.user.username},
            {password: hashedPassword}
          )
          .then((result) => {
            res.status(201).send({
              message: 'password successfully changed',
              result
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: 'error changing password',
              err
            });
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

module.exports = changePassword;
