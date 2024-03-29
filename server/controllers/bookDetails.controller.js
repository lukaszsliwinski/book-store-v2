const axios = require('axios');

// get book details from API by book ID
const bookDetails = (request, response) => {
  axios
    .get(`https://www.googleapis.com/books/v1/volumes/${request.body.id}`)
    .then((result) => {
      let authors = [];
      try {
        result.data.volumeInfo.authors.map((author) => authors.push(author));
      } catch {}

      response.json({
        bookId: result.data.id,
        title: result.data.volumeInfo.title,
        authors: authors,
        description:
          result.data.volumeInfo.description == undefined
            ? '-'
            : result.data.volumeInfo.description,
        publisher:
          result.data.volumeInfo.publisher == undefined ? '-' : result.data.volumeInfo.publisher,
        publishedDate:
          result.data.volumeInfo.publishedDate == undefined
            ? '-'
            : result.data.volumeInfo.publishedDate,
        price:
          result.data.saleInfo.listPrice == undefined || result.data.saleInfo.listPrice.amount == 0
            ? 14.99
            : result.data.saleInfo.listPrice.amount.toFixed(2),
        coverUrl:
          result.data.volumeInfo.imageLinks == undefined
            ? 'no-cover.png'
            : result.data.volumeInfo.imageLinks.thumbnail
      });
    })
    .catch(() => {
      response.json({
        message: 'book not found'
      });
    });
};

module.exports = bookDetails;
