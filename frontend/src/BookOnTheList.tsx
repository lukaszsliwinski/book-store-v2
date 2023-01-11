import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { IBookData, IBookInCart } from './types';

const cookies = new Cookies();

export default function BookOnTheList({ data } : { data: IBookData }) {
  const [dataToCart, setDataToCart] = useState<IBookInCart>();
  const [counter, setCounter] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setDataToCart({
      bookId: data.bookId,
      title: data.title,
      authors: data.authors,
      price: data.price,
      amount: counter
    })
  }, [counter]);

  const showDetails = () => {
    navigate(`/books/${data.bookId}`);
  };

  const minutOne = () => { if (counter > 1) setCounter(counter - 1) };

  const plusOne = () => { if (counter < 5) setCounter(counter + 1) };

  const addToCart = (dataToCart: IBookInCart) => {
    const token = cookies.get('TOKEN');

    if (token) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const book = cart.find((item: IBookInCart) => item.bookId === dataToCart.bookId)
      if (book && book.amount < 5) {
        book.amount += dataToCart.amount;
        if (book.amount > 5) book.amount = 5;
        cart.map((item: IBookInCart) => {
          return (item.bookId === book.bookId) ? book : item;
        });
      } else if (!book) {
        cart.push(dataToCart);
      };
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
      <div>
        <button onClick={() => minutOne()}>-</button>
        <label>{counter}</label>
        <button onClick={() => plusOne()}>+</button>
      </div>
    </ul>
  );
};
