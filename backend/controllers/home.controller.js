const axios = require('axios');

const home = (req, res) => {
  let books = [];
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.input}&key=${process.env.API_KEY}&maxResults=4`)
    .then((result) => {
      books = result.data.items;
      console.log(books);
      res.json({response: books});
    })
    .catch((err) => console.log(err));
};

module.exports = home;
