import { ReactComponent as ArrowDown } from '../assets/svg/arrowdown.svg';
import { IOrder } from '../types';

export default function HistoryItem({ order }: { order: IOrder }) {
  return (
    <div className='m-2 p-2 rounded-sm shadow-md bg-white dark:bg-custom-gray'>
      <div className='flex justify-between items-center text-xs'>
        <span className='font-bold'>order {order.number} - {order.date.substring(0,10)}</span>
        <span></span>

        <button
          className='p-1 hover:text-custom-main'
          type='button' data-bs-toggle='collapse' data-bs-target={`#collapse${order.number}`} aria-expanded='false' aria-controls={`collapse${order.number}`}>
          <ArrowDown className='ml-1 w-2'/>
        </button>
      </div>

      <div className='collapse border-t' id={`collapse${order.number}`}>
        <div className='p-2 pb-0'>
          {order.books.map((book, i) => {
            return (
              <div className='flex justify-between text-xs'>
                <span>{i+1}. {book.title} </span>
                <span className='text-sm'>{book.amount} x {book.price} $</span>
              </div>
            )
          })}
          <div className='mt-2 text-sm text-right'>total: {order.total} $</div>
        </div>
      </div>
    </div>
  );
};
