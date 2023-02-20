const axios = require('axios');

// search books by provided query
const search = (request, response) => {
  let books = [];
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${request.body.query}&key=${process.env.API_KEY}&maxResults=40`
    )
    .then((result) => {
      if (result.data.totalItems !== 0) {
        result.data.items.map((item) => {
          let authors = [];
          try {
            item.volumeInfo.authors.map((author) => authors.push(author));
          } catch {}

          books.push({
            bookId: item.id,
            title: item.volumeInfo.title,
            authors: authors,
            price:
              item.saleInfo.listPrice == undefined || item.saleInfo.listPrice.amount == 0
                ? 14.99
                : item.saleInfo.listPrice.amount.toFixed(2),
            coverUrl:
              item.volumeInfo.imageLinks == undefined
                ? 'no-cover.png'
                : item.volumeInfo.imageLinks.thumbnail
          });
        });
      }

      response.json({
        response: books
      });
    })
    .catch((error) => {
      response.json({
        response: books,
        error
      });
    });
};

module.exports = search;
