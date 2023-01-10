import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import BookOnTheList from './BookOnTheList';

export default function Home() {
  const [input, setInput] = useState('');
  const [bookList, setBooklist] = useState<JSX.Element[] | string>('');   // przy tworzeniu frontu usunąć typ string i przekazać komunikat 'no result' listę z jednym komponentem

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
      if (input === '') setBooklist('');
      if (inputElement.current && inputElement.current.value === input && input !== '') {
        const axiosSearchConfig = {
          method: 'post',
          url: '/search',
          data: {
            input: input
          }
        };

        axios(axiosSearchConfig)
          .then((result) => {
            const data = result.data.response;

            if (data.length === 0) {
              setBooklist('no result');
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
    <>
      <input type="text" ref={inputElement} onChange={(e) => handleChange(e)} />
      <div>
        {bookList}
      </div>
    </>
  );
};
