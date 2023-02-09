import { useState, useRef } from 'react';
import axios from 'axios';

import { ReactComponent as SearchIcon } from './assets/search.svg';
import Btn from './Btn';
import BookOnTheList from './BookOnTheList';

export default function Search() {
  const [input, setInput] = useState('');
  const [bookList, setBooklist] = useState<JSX.Element[]>([]);

  // input ref
  const inputElement = useRef<HTMLInputElement>(null);

  // handle input change and set state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  // handle enter press
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      search();
    };
  };

  // search book post request
  const search = () => {
    if (input === '') setBooklist([]);
    if (inputElement.current && inputElement.current.value === input && input !== '') {
      const axiosSearchConfig = {
        method: 'post',
        url: '/api/search',
        data: {
          input: input
        }
      };

      axios(axiosSearchConfig)
        .then((result) => {
          const data = result.data.response;

          if (data.length === 0) {
            setBooklist([
              <div className='col-span-3 mt-4 text-center font-semibold text-custom-black dark:text-custom-white'>NO RESULTS</div>
            ]);
          } else {
            // create list of components
            let components: JSX.Element[] = [];

            for (let i = 0; i < data.length; i++) {
              components.push(
                <BookOnTheList
                  data={result.data.response[i]}
                />
              );
            };

            // render list of books
            setBooklist(components);
          }
        })
        .catch((error) => {
          error = new Error();
        });
    };
  };

  return (
    <div className='flex flex-col items-center bg-custom-white dark:bg-custom-gray'>
      <div className='flex justify-center'>
        <div className='relative my-3 xl:w-[32rem]'>
          <input
            ref={inputElement}
            type='text'
            className='form-control block w-full pl-6 pr-36 py-3 text-lg font-normal text-custom-black bg-white dark:bg-custom-white bg-clip-padding border-2 border-solid border-transparent rounded-lg transition ease-in-out m-0 focus:ring-0 focus:border-custom-main focus:outline-none'
            onChange={(event) => handleChange(event)}
            onKeyDown={(event) => handleEnter(event)}
            placeholder='Title, authors, ...'
          />
          <div className='absolute top-[11px] right-2'>
            <Btn onclick={() => search()} label='search' icon={<SearchIcon className='ml-2 w-3'/>} />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-6 mb-6'>
        {bookList}
      </div>
    </div>
  );
};
