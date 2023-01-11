import { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ILoggedState } from './types';

const cookies = new Cookies();

export default function Register({ logged, setLogged }: ILoggedState) {
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
      const axiosRegConf = {
        method: 'post',
        url: '/register',
        data: {
          username,
          password
        }
      };

      const axiosLogConf = {
        method: 'post',
        url: '/login',
        data: {
          username,
          password
        }
      };

      axios(axiosRegConf)
        .then(() => {
          // login automatically after successful registration
          axios(axiosLogConf)
            .then((result) => {
              setUsername('');
              setPassword('');
              cookies.set('TOKEN', result.data.token, {path: '/'});
              setLogged(true);
            })
            .catch((error) => {
              error = new Error();
            });
          setUsername('');
          setPassword('');
        })
        .catch((error) => {
          if (error.response.data.item === 'username') {
            setUsernameAlert(error.response.data.message);
          } else if (error.response.data.item === 'password') {
            setPasswordAlert(error.response.data.message);
          };
        });
    };
  };

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h4>register form</h4>
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
        <button type='submit' onClick={(event) => handleSubmit(event)}>register</button>
        <div>Already have an account? <a href="/login">login</a></div>
      </form>
      <h6>Correct username:</h6>
      <ul>
        <li>should contain 3 - 30 characters</li>
        <li>should not contain spaces</li>
      </ul>
      <h6>Correct password:</h6>
      <ul>
        <li>should contain 8 - 100 characters</li>
        <li>should contain uppercase and lowercase letters</li>
        <li>should contain at least 1 digit</li>
        <li>should not contain spaces</li>
      </ul>
    </>
  );
};
