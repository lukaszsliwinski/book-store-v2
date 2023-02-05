import { useState, useEffect } from 'react';

import { ReactComponent as ArrowUp } from './assets/arrowup.svg';
import { ReactComponent as ArrowDown } from './assets/arrowdown.svg';
import Btn from './Btn';
import { IBookDetails, IBook } from './types';
import { addToCart } from './utils';

export default function BookOnTheList({ data } : { data: IBookDetails }) {
  const [dataToCart, setDataToCart] = useState<IBook>();
  const [authors, setAuthors] = useState<JSX.Element[]>([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    setDataToCart({
      bookId: data.bookId,
      title: data.title,
      authors: data.authors,
      price: data.price,
      amount: counter
    })

    let components: JSX.Element[] = [];

    for (let i = 0; i < data.authors.length; i++) {
      components.push(
        <span>
          {data.authors[i]}
          {(i !== data.authors.length-1) ? ',' : ''}
          &nbsp;
        </span>
      );
    };

    setAuthors(components);

  }, [counter]);

  return (
      <div className='flex flex-col md:flex-row md:max-w-sm rounded-lg bg-white dark:bg-custom-black text-custom-black dark:text-custom-white shadow-lg'>
        <img className='w-full h-96 md:h-auto object-cover md:w-32 rounded-t-lg md:rounded-none md:rounded-l-lg' src={data.coverUrl} alt='book cover' />
        <div className='p-4 flex flex-col justify-start'>
          <a href={`/books/${data.bookId}`} className='text-sm font-bold hover:underline'>{data.title}</a>
          <div className='flex text-xs'>{authors}</div>
          <div className='my-4 text-xl font-bold text-custom-main'>{data.price} $</div>
          <div className='flex items-center'>
            <div className='flex items-center border px-2 text-custom-black dark:bg-custom-white'>
              <div className='font-medium text-lg'>{counter}</div>
              <div className='inline-flex flex-col ml-2'>
                <button onClick={() => {if (counter < 5) setCounter(counter + 1)}}><ArrowUp className='w-2 hover:text-custom-main'/></button>
                <button onClick={() => {if (counter > 1) setCounter(counter - 1)}}><ArrowDown className='w-2 hover:text-custom-main'/></button>
              </div>
            </div>
            <Btn onclick={() => {if (dataToCart) addToCart(dataToCart)}} label='buy' icon={undefined} />
          </div>
        </div>
      </div>
  );
};
