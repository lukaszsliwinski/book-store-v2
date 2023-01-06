const axios = require('axios');

const home = (req, res) => {
  let books = [];
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.input}&key=${process.env.API_KEY}&maxResults=40`)
    .then((result) => {
      result.data.items.map(item => {
        let authors = [];
        try {
          item.volumeInfo.authors.map(author => authors.push(author));
        } catch {};

        books.push({
          id: item.etag,
          title: item.volumeInfo.title,
          authors: authors,
          description: (item.volumeInfo.description == undefined) ? '-' : item.volumeInfo.description,
          publisher: (item.volumeInfo.publisher == undefined) ? '-' : item.volumeInfo.publisher,
          publishedDate: (item.volumeInfo.publishedDate == undefined) ? '-' : item.volumeInfo.publishedDate,
          price: (item.saleInfo.listPrice == undefined) ? 14.99 : item.saleInfo.listPrice.amount,
          imgSrc: (item.volumeInfo.imageLinks == undefined) ? 'no-cover.png' : item.volumeInfo.imageLinks.thumbnail
        });
      });

      res.json({
        response: books
      });
    })
    .catch((err) => {
      res.json({
        response: books
      });
    });
};

module.exports = home;
