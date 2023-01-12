import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { IBookData, IBookInCart } from './types';
import { addToCart } from './utils';

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

  return (
    <ul>
      <li>{data.title}</li>
      <li>{data.authors}</li>
      <li><img src={data.coverUrl} height="150" alt="book cover"/></li>
      <li>{data.price} $</li>
      <button onClick={() => showDetails()}>details</button>
      <button onClick={() => {if (dataToCart) addToCart(dataToCart)}}>add to cart</button>
      <div>
        <button onClick={() => { if (counter > 1) setCounter(counter - 1) }}>-</button>
        <label>{counter}</label>
        <button onClick={() => { if (counter < 5) setCounter(counter + 1) }}>+</button>
      </div>
    </ul>
  );
};
