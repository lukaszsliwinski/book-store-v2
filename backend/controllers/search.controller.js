const axios = require('axios');

const search = (request, response) => {
  let books = [];
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${request.body.input}&key=${process.env.API_KEY}&maxResults=40`)
    .then((result) => {
      result.data.items.map(item => {
        let authors = [];
        try {
          item.volumeInfo.authors.map(author => authors.push(author));
        } catch {};

        books.push({
          bookId: item.id,
          title: item.volumeInfo.title,
          authors: authors,
          price: (item.saleInfo.listPrice == undefined) ? 14.99 : item.saleInfo.listPrice.amount,
          coverUrl: (item.volumeInfo.imageLinks == undefined) ? 'no-cover.png' : item.volumeInfo.imageLinks.thumbnail
        });
      });

      response.json({
        response: books
      });
    })
    .catch((error) => {
      console.log(error);
      response.json({
        response: books
      });
    });
};

module.exports = search;
