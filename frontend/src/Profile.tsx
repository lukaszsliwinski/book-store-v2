import { useState } from 'react';
import axios from 'axios';

import History from './History';

export default function Profile({ token }: { token: string }) {
  const [password, setPassword] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setPasswordAlert('');

    if (password === '') {
      setPasswordAlert('provide a password');
    } else {
      const axiosChangePasswordConfig = {
        method: 'post',
        url: '/change-password',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          password
        }
      };

      axios(axiosChangePasswordConfig)
        .then((result) => {
          setPassword('');

          setPasswordAlert(result.data.message);
        })
        .catch((error) => {
          setPasswordAlert(error.response.data.message);
        });
    };
  };

  return (
    <>
      <h3>Profile page</h3>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h4>change password</h4>
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
        <button type='submit' onClick={(event) => handleSubmit(event)}>change</button>
      </form>
      <h6>Correct password:</h6>
      <ul>
        <li>should contain 8 - 100 characters</li>
        <li>should contain uppercase and lowercase letters</li>
        <li>should contain at least 1 digit</li>
        <li>should not contain spaces</li>
      </ul>
      <History token={token} />
    </>
  );
};
