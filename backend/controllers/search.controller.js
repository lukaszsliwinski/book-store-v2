const axios = require('axios');

const search = (req, res) => {
  let books = [];
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.input}&key=${process.env.API_KEY}&maxResults=40`)
    .then((result) => {
      console.log('handle success');
      result.data.items.map(item => {
        let authors = [];
        try {
          item.volumeInfo.authors.map(author => authors.push(author));
        } catch {};

        books.push({
          id: item.id,
          title: item.volumeInfo.title,
          authors: authors,
          price: (item.saleInfo.listPrice == undefined) ? 14.99 : item.saleInfo.listPrice.amount,
          coverUrl: (item.volumeInfo.imageLinks == undefined) ? 'no-cover.png' : item.volumeInfo.imageLinks.thumbnail
        });
      });

      res.json({
        response: books
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        response: books
      });
    });
};

module.exports = search;
