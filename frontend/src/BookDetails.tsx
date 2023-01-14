import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { IBookDetails, IBook } from './types';
import { addToCart } from './utils';

export default function BookDetails() {
  const [bookData, setBookData] = useState<IBookDetails>();
  const [coverUrl, setCoverUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dataToCart, setDataToCart] = useState<IBook>();
  const [counter, setCounter] = useState(1);

  const params = useParams();

  useEffect(() => {
    const axiosBookDetailsConfig = {
      method: 'post',
      url: '/api/book-details',
      data: {
        id: params.id
      }
    };

    axios(axiosBookDetailsConfig)
      .then((result) => {
        if (result.data.message === 'book not found') {
          setErrorMessage(result.data.message);
        } else {
          setErrorMessage('');
          setBookData(result.data);

          if (result.data.coverUrl === 'no-cover.png') {
            setCoverUrl('../no-cover.png');
          } else {
            setCoverUrl(result.data.coverUrl);
          };

          setDataToCart({
            bookId: result.data.bookId,
            title: result.data.title,
            authors: result.data.authors,
            price: result.data.price,
            amount: counter
          });
        };
      })
      .catch((error) => {
        error = new Error();
        console.log('404')
      });
  }, []);

  useEffect(() => {
    if (dataToCart) {
      setDataToCart({
        bookId: dataToCart.bookId,
        title: dataToCart.title,
        authors: dataToCart.authors,
        price: dataToCart.price,
        amount: counter
      });
    };
  }, [counter]);

  return (
    <>
      {bookData ?
      <div>
        <div>Title: {bookData.title}</div>
        <div>Authors: {bookData.authors}</div>
        <div><img src={coverUrl} height="150" alt="book cover"/></div>
        <div>Description: {bookData.description}</div>
        <div>Price: {bookData.price} $</div>
        <div>Publisher: {bookData.publisher}</div>
        <div>Published date: {bookData.publishedDate}</div>
        <button onClick={() => {if (dataToCart) addToCart(dataToCart)}}>add to cart</button>
          <div>
            <button onClick={() => { if (counter > 1) setCounter(counter - 1) }}>-</button>
            <label>{counter}</label>
            <button onClick={() => { if (counter < 5) setCounter(counter + 1) }}>+</button>
          </div>
      </div> :
      <div>{errorMessage}</div>}
    </>
  );
};
