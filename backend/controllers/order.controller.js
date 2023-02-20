const moment = require('moment');
const Order = require('../models/order.model');

// assign order to user and save to database
const order = (request, response) => {
  const date = moment().utc(false).format('YYYY-MM-DD HH:mm:ss');

  Order
    .find().sort({ number: -1 }).limit(1)
    .then((result) => {
      const lastOrderNum = result[0].number;

      const order = new Order({
        number: lastOrderNum + 1,
        username: response.locals.user.username,
        date: date,
        books: request.body.cart,
        total: request.body.total
      });

      order
        .save()
        .then((result) => {
          response.status(200).send({
            message: 'Book(s) successfully ordered!',
            result
          });
        })
        .catch((error) => {
          if (error.code === 11000) {
            response.status(422).send({
              message: 'order number already exist',
              error
            });
          } else {
            response.status(500).send({
              message: 'error creating order',
              error
            });
          };
        });

    })
    .catch((error) => {
      response.status(500).send({
        message: 'error connecting to db',
        error
      });
    });
};

module.exports = order;
