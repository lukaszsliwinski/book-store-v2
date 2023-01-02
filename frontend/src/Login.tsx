import { useState } from 'react';
import axios from 'axios'
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // dodać przekierowanie jeśli użytkownik jest już zalogowany

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const axiosConfig = {
      method: 'post',
      url: '/login',
      data: {
        username,
        password
      }
    };

    axios(axiosConfig)
      .then((result) => {
        setUsername('');
        setPassword('');
        cookies.set('TOKEN', result.data.token, {path: '/'});
      })
      .catch((err) => {
        err = new Error();
      });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h4>login</h4>
        <div>
          <label>username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter username"
          />
        </div>
        <div>
          <label>password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
          />
        </div>
        <button type='submit' onClick={(e) => handleSubmit(e)}>login</button>
        <div>Don't have an account? <a href="/register">register</a></div>
      </form>
    </>
  )
}