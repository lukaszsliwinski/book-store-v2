import { ReactComponent as ArrowDown } from '../assets/svg/arrowdown.svg';
import { IOrder } from '../types';

export default function HistoryItem({ order }: { order: IOrder }) {
  return (
    <div className="dark:shadow-dark my-2 rounded-sm bg-white p-2 shadow-md dark:bg-zinc-900">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold">
          order {order.number} - {order.date.substring(0, 10)}
        </span>
        <span></span>

        <button
          className="p-1 hover:text-teal-700"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${order.number}`}
          aria-expanded="false"
          aria-controls={`collapse${order.number}`}
        >
          <ArrowDown className="ml-1 w-2" />
        </button>
      </div>

      <div className="collapse border-t" id={`collapse${order.number}`}>
        <div className="p-2 pb-0">
          {order.books.map((book, i) => {
            return (
              <div
                key={i}
                className="xs:mb-1 mb-3 flex flex-col justify-between text-xs sm:flex-row"
              >
                <div>
                  {i + 1}. {book.title}{' '}
                </div>
                <div className="ml-auto w-28 text-right text-sm ">
                  {book.amount}&nbsp;x&nbsp;{book.price}&nbsp;$
                </div>
              </div>
            );
          })}
          <div className="mt-2 text-right text-sm">total: {order.total} $</div>
        </div>
      </div>
    </div>
  );
}
