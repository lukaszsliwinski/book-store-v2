const Order = require('../models/order.model');

// get all orders made by logged username
const history = async (request, response) => {
  Order.find({ username: response.locals.user.username }) // requires auth middleware set in server.js
    .then((result) => {
      let history = [];
      for (let i = 0; i < result.length; i++) {
        history.push({
          number: result[i].number,
          date: result[i].date,
          books: result[i].books,
          total: result[i].total
        });
      }

      response.json({
        history: history
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
