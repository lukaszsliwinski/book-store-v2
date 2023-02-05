import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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

  // search book post request
  useEffect(() => {
    // prevent from post request after every letter written in input field
    setTimeout(() => {
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
    }, 500)
  }, [input]);

  return (
    <div className='flex flex-col items-center bg-custom-white dark:bg-custom-gray'>
      <div className='flex justify-center'>
        <div className='my-3 xl:w-[32rem]'>
          <input
            ref={inputElement}
            type='text'
            className='form-control block w-full px-6 py-3 text-lg font-normal text-custom-black bg-white dark:bg-custom-white bg-clip-padding border-2 border-solid border-transparent rounded-full transition ease-in-out m-0 focus:ring-0 focus:border-custom-main focus:outline-none'
            onChange={(e) => handleChange(e)}
            placeholder='Title, authors, ...'
          />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-6 mb-6'>
        {bookList}
      </div>
    </div>
  );
};
