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

const changePassword = async (request, response) => {
  if (!passwordSchema.validate(request.body.password)) {
    response.status(400).send({
      message: 'incorrect password format'
    });
  } else {
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        User
          .findOneAndUpdate(
            {username: response.locals.user.username},
            {password: hashedPassword}
          )
          .then((result) => {
            response.status(201).send({
              message: 'Password successfully changed!',
              result
            });
          })
          .catch((error) => {
            response.status(500).send({
              message: 'error changing password',
              error
            });
          });
      })
      .catch((error) => {
        response.status(500).send({
          message: 'password was not hashed successfully',
          error
        });
      });
  };
};

module.exports = changePassword;
