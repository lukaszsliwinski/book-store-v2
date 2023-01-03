import { useState } from 'react';
import axios from 'axios'
import Cookies from "universal-cookie";
import { ILoggedState } from './types';

const cookies = new Cookies();

export default function Login({ logged, setLogged }: ILoggedState) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameAlert, setUsernameAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (logged) window.location.href = '/profile';

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

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
        .catch((err) => {
          const errMessage = err.response.data.message;
          if (errMessage === 'user not found') {
            setUsernameAlert(errMessage);
          } else if (errMessage === 'wrong password') {
            setPasswordAlert(errMessage);
          } else {
            err = new Error();
          };
        });
    };
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
        {(usernameAlert != '' ? <div>{usernameAlert}</div> : '')}
        <div>
          <label>password: </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <button type='submit' onClick={(e) => handleSubmit(e)}>login</button>
        <div>Don't have an account? <a href="/register">register</a></div>
      </form>
    </>
  );
};
