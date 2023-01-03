import { useState } from 'react';
import axios from 'axios';

export default function Profile({ username, token }: { username: string, token: string }) {
  const [password, setPassword] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setPasswordAlert('');

    if (password === '') {
      setPasswordAlert('provide a password');
    } else {
      const axiosChangePassConf = {
        method: 'post',
        url: '/change-password',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          username,
          password
        }
      };

      axios(axiosChangePassConf)
        .then((result) => {
          setPassword('');
          console.log(result.data.message);
          setPasswordAlert(result.data.message);
        })
        .catch((err) => {
          setPasswordAlert(err.response.data.message);
        });
    };
  };

  return (
    <>
      <h3>Profile page</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h4>change password</h4>
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
        <button type='submit' onClick={(e) => handleSubmit(e)}>change</button>
      </form>
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
