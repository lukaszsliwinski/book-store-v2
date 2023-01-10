const axios = require('axios');

const bookDetails = (request, response) => {
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${request.body.id}&key=${process.env.API_KEY}&maxResults=1`)
    .then((result) => {
      if (result.data.totalItems !== 0) {
        let authors = [];
        try {
          result.data.items[0].volumeInfo.authors.map(author => authors.push(author));
        } catch {};

        response.json({
          title: result.data.items[0].volumeInfo.title,
          authors: authors,
          description: (result.data.items[0].volumeInfo.description == undefined) ? '-' : result.data.items[0].volumeInfo.description,
          publisher: (result.data.items[0].volumeInfo.publisher == undefined) ? '-' : result.data.items[0].volumeInfo.publisher,
          publishedDate: (result.data.items[0].volumeInfo.publishedDate == undefined) ? '-' : result.data.items[0].volumeInfo.publishedDate,
          price: (result.data.items[0].saleInfo.listPrice == undefined) ? 14.99 : result.data.items[0].saleInfo.listPrice.amount,
          coverUrl: (result.data.items[0].volumeInfo.imageLinks == undefined) ? 'no-cover.png' : result.data.items[0].volumeInfo.imageLinks.thumbnail
        });
      } else {
        response.json({
          message: 'book not found'
        });
      };
    })
    .catch((error) => {
      response.json({
        message: 'book not found'
      });
    });
};

module.exports = bookDetails;
