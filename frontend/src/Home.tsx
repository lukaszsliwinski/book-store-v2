import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  // input ref
  const inputElement = useRef<HTMLInputElement>(null);

  // handle input change and set state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  // search book post request
  useEffect(() => {
    // prevent from post request after every letter written in input field
    setTimeout(() => {
      if (inputElement.current && inputElement.current.value === input && input !== '') {
        const axiosConfig = {
          method: 'post',
          url: '/home',
          data: {
            input: input
          }
        };

        axios(axiosConfig)
          .then((result) => {
            // setResponse(result.data.response);
            console.log(result.data.response);
          })
          .catch((err) => {
            err = new Error();
          });
      }
    }, 700)
  }, [input])

  return (
    <>
      <input type="text" ref={inputElement} onChange={(e) => handleChange(e)} />
      <h4>{response}</h4>
    </>
  );
};
