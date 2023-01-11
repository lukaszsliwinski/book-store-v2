import { useState } from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';
import { ILoggedState } from './types';

const cookies = new Cookies();

export default function Login({ logged, setLogged }: ILoggedState) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameAlert, setUsernameAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (logged) window.location.href = '/profile';

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setUsernameAlert('');
    setPasswordAlert('');

    if (username === '' || password === '') {
      if (username === '') setUsernameAlert('provide an username');
      if (password === '') setPasswordAlert('provide a password');
    } else {
      const axiosLogConf = {
        method: 'post',
        url: '/login',
        data: {
          username,
          password
        }
      };

      axios(axiosLogConf)
        .then((result) => {
          setUsername('');
          setPassword('');
          cookies.set('TOKEN', result.data.token, {path: '/'});
          setLogged(true);
        })
        .catch((error) => {
          const errorMessage = error.response.data.message;
          if (errorMessage === 'user not found') {
            setUsernameAlert(errorMessage);
          } else if (errorMessage === 'wrong password') {
            setPasswordAlert(errorMessage);
          } else {
            error = new Error();
          };
        });
    };
  };

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h4>login</h4>
        <div>
          <label>username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="enter username"
          />
        </div>
        {(usernameAlert != '' ? <div>{usernameAlert}</div> : '')}
        <div>
          <label>password: </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "hide password" : "show password"}
          </button>
        </div>
        {(passwordAlert != '' ? <div>{passwordAlert}</div> : '')}
        <button type='submit' onClick={(event) => handleSubmit(event)}>login</button>
        <div>Don't have an account? <a href="/register">register</a></div>
      </form>
    </>
  );
};
