const Order = require('../models/order.model');

const history = async (request, response) => {
  Order
    .find({ username: response.locals.user.username })   // requires auth middleware set in server.js
    .then((result) => {
      response.json({
        history: result
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: 'error connecting to db',
        error
      });
    });
};

module.exports = history;
