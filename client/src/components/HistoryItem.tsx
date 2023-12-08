import { ReactComponent as ArrowDown } from '../assets/svg/arrowdown.svg';
import { IOrder } from '../types';

export default function HistoryItem({ order }: { order: IOrder }) {
  return (
    <div className="dark:shadow-dark my-4 rounded-sm bg-white px-4 shadow-sm dark:bg-zinc-800">
      <button
        className="flex h-12 w-full items-center justify-between text-sm hover:text-teal-700"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#collapse${order.number}`}
        aria-expanded="false"
        aria-controls={`collapse${order.number}`}
      >
        <span className="font-semibold">
          order {order.number} - {order.date.substring(0, 10)}
        </span>
        <span className="p-1">
          <ArrowDown className="w-3" />
        </span>
      </button>

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
          <div className="mt-2 text-right text-sm font-semibold">total: {order.total} $</div>
        </div>
      </div>
    </div>
  );
}
