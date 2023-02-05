import { useState, useEffect } from "react";

import { ReactComponent as ArrowDown } from './assets/arrowdown.svg';
import { IOrder } from "./types";

export default function HistoryItem({ order }: { order: IOrder }) {
  const [booksOnOrder, setBooksOnOrder] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let components: JSX.Element[] = [];

    for (let i = 0; i < order.books.length; i++) {
      components.push(
        <div className='flex justify-between text-xs'>
          <span>{i+1}. {order.books[i].title} </span>
          <span>{order.books[i].amount} x {order.books[i].price} $</span>
        </div>
      );
    };

    setBooksOnOrder(components);
  }, []);

  return (
    <div className='m-2 p-2 rounded-lg shadow-lg bg-white dark:bg-custom-gray'>

      <div className='flex justify-between items-center text-xs'>
        <span>order {order.number}</span>
        <span>{order.date.substring(0,10)}</span>
        <span>{order.total} $</span>
        <button
          className='p-1 hover:text-custom-main'
          type='button' data-bs-toggle='collapse' data-bs-target={`#collapse${order.number}`} aria-expanded='false' aria-controls={`collapse${order.number}`}>
          <ArrowDown className='ml-1 w-2'/>
        </button>
      </div>

      <div className='collapse border-t' id={`collapse${order.number}`}>
        <div className='p-2'>{booksOnOrder}</div>
      </div>
    </div>
  );
};
