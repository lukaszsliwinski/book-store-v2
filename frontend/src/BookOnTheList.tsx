import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { IBookData, IBookInCart } from './types';

const cookies = new Cookies();

export default function BookOnTheList({ data } : { data: IBookData }) {
  const [dataToCart, setDataToCart] = useState<IBookInCart>();
  const navigate = useNavigate();

  useEffect(() => {
    setDataToCart({
      bookId: data.bookId,
      title: data.title,
      authors: data.authors,
      price: data.price,
      amount: 1
    })
  }, []);

  const showDetails = () => {
    navigate(`/books/${data.bookId}`);
  };

  const addToCart = (dataToCart: IBookInCart) => {
    const token = cookies.get('TOKEN');

    if (token) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const book = cart.find((item: IBookInCart) => item.bookId === dataToCart.bookId)
      if (book && book.amount < 5) {
        book.amount += 1;
        cart.map((item: IBookInCart) => {
          return (item.bookId === book.bookId) ? book : item;
        });
      } else if (!book) {
        cart.push(dataToCart);
      }
      localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      window.location.href = '/login';
    };
  };

  return (
    <ul>
      <li>{data.title}</li>
      <li>{data.authors}</li>
      <li><img src={data.coverUrl} height="150" alt="book cover"/></li>
      <li>{data.price} $</li>
      <button onClick={() => showDetails()}>details</button>
      <button onClick={() => {if (dataToCart) addToCart(dataToCart)}}>add to cart</button>
    </ul>
  );
};
