const axios = require('axios');

const CartItem = require('../models/cartItem.model');

const showCart = (req, res) => {
  let cart = [];

  CartItem
    .find({ username: res.locals.user.username })
    .then((result) => {
      Promise.all(result.map(async (item) => {
        await axios
          .get(`https://www.googleapis.com/books/v1/volumes?q=${item.bookId}&key=${process.env.API_KEY}&maxResults=1`)
          .then((result) => {
            let authors = [];
            try {
              result.data.items[0].volumeInfo.authors.map(author => authors.push(author));
            } catch {};

            cart.push({
              title: result.data.items[0].volumeInfo.title,
              authors: authors,
              price: (result.data.items[0].saleInfo.listPrice == undefined) ? 14.99 : result.data.items[0].saleInfo.listPrice.amount,
              amount: item.amount
            });
          })
          .catch((err) => {
            console.error(err);
          });
      })).then(() => {
        res.status(200).send({
          cart: cart
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: 'error getting books in cart by id',
        err
      });
    });
};

module.exports = showCart;
