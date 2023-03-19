import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { ReactComponent as Eye } from '../assets/svg/eye.svg';
import { ReactComponent as EyeSlash } from '../assets/svg/eyeslash.svg';
import { IRootState } from '../store';
import { alertActions } from '../store/alertSlice';
import Btn from '../components/Btn';
import History from '../components/History';
import { getToken } from '../utils';

export default function Profile() {
  // local state
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // global state
  const username = useSelector((state: IRootState) => state.auth.username);

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setError = (value: boolean) => dispatch(alertActions.setError(value));
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setPasswordAlert('');

    // validate input value
    if (passwordInput === '') {
      setPasswordAlert('provide a password');
    } else {
      // change password post request
      const token = getToken();

      const axiosChangePasswordConfig = {
        method: 'post',
        url: '/api/change-password',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          passwordInput
        }
      };

      axios(axiosChangePasswordConfig)
        .then((result) => {
          setPasswordInput('');
          setAlertMessage(result.data.message);
          setShowAlert(true);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setPasswordAlert(error.response.data.message);
          } else {
            setError(true);
            setAlertMessage('Database connection error - please try again later!');
            setShowAlert(true);
          }
        });
    }
  };

  return (
    <div className="mt-4 flex justify-center">
      <div className="dark:bg-custom-black text-custom-black dark:text-custom-white dark:shadow-dark mx-4 w-full max-w-4xl rounded-sm bg-white p-3 shadow-md md:p-6">
        <h4 className="text-custom-main text-center font-bold uppercase">{username} - profile</h4>
        <div className="flex flex-col items-center md:flex-row md:justify-around">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="form-group mx-auto mt-6 grid max-w-xs grid-cols-12">
              <div className="xs:col-span-11 col-span-10">
                <label className="form-label mb-2 ml-2 inline-block text-xs font-semibold">
                  change password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(event) => setPasswordInput(event.target.value)}
                  className="form-control text-custom-black dark:text-custom-white bg-custom-white focus:border-custom-main m-0 block w-full rounded-sm border-2 border-solid border-transparent bg-clip-padding px-3 py-1.5 text-base font-normal transition ease-in-out focus:outline-none focus:ring-0 dark:bg-white/10"
                  placeholder="ender password"
                />
              </div>
              <button
                type="button"
                className="xs:ml-2 mt-8 ml-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlash className="hover:text-custom-main w-5" />
                ) : (
                  <Eye className="hover:text-custom-main w-5" />
                )}
              </button>
            </div>
            <div>
              {passwordAlert !== '' ? (
                <div className="ml-2 text-xs text-red-600">{passwordAlert}</div>
              ) : (
                ''
              )}
            </div>
            <div className="mt-6 text-center">
              <Btn onclick={(event) => handleSubmit(event)} label="change" icon={undefined} />
            </div>
          </form>

          <div className="mt-10 text-xs">
            <h6 className="font-semibold">Correct password:</h6>
            <ul className="mt-1">
              <li>should contain 8 - 100 characters</li>
              <li>should contain uppercase and lowercase letters</li>
              <li>should contain at least 1 digit</li>
              <li>should not contain spaces</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <History />
        </div>
      </div>
    </div>
  );
}
