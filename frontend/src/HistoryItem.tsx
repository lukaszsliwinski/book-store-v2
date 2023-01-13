import { useState, useEffect } from "react";

import { IOrder } from "./types";

export default function HistoryItem({ order }: { order: IOrder }) {
  const [booksOnOrder, setBooksOnOrder] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let components: JSX.Element[] = [];

    for (let i = 0; i < order.books.length; i++) {
      components.push(
        <div>
          <small>{i+1}. </small>
          <small>{order.books[i].authors} - {order.books[i].title} </small>
          <small>{order.books[i].amount} x {order.books[i].price}</small>
        </div>
      );
    };

    setBooksOnOrder(components);
  }, []);

  return (
    <div>
      <h6>order no: {order.number} --- {order.date}</h6>
      {booksOnOrder}
      <small>total: {order.total}</small>
    </div>
  );
};
