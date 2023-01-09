const CartItem = require('../models/cartItem.model');

const addToCart = (req, res) => {
  const item = new CartItem({
      username: res.locals.user.username,
      bookId: req.body.id
  });

  item
    .save()
    .then((result) => {
      res.status(201).send({
        message: 'book added to cart successfully',
        result
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error adding to cart',
        err
      });
    });
};

module.exports = addToCart;
