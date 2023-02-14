import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { ReactComponent as Eye } from './assets/eye.svg';
import { ReactComponent as EyeSlash } from './assets/eyeslash.svg';
import Btn from './Btn';
import History from './History';
import { IRootState } from './store';
import { alertActions } from './store/alertSlice';
import { getToken } from './utils';

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

    if (passwordInput === '') {
      setPasswordAlert('provide a password');
    } else {
      const token = getToken();

      const axiosChangePasswordConfig = {
        method: 'post',
        url: '/api/change-password',
        headers: {
          Authorization: `Bearer ${token}`,
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
          };
        });
    };
  };

  return (
    <div className='mx-auto my-4 md:w-3/4 p-6 rounded-sm bg-white dark:bg-custom-black text-custom-black dark:text-custom-white shadow-lg'>
      <h4 className='text-center font-bold text-custom-main uppercase'>{username} - profile</h4>
      <div className='grid grid-cols-2'>
        <div className='flex justify-center'>
          <div>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className='grid grid-cols-12 form-group mt-6'>
                <div className='col-span-11'>
                  <label className='form-label inline-block mb-2 ml-2 text-xs font-semibold '>change password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(event) => setPasswordInput(event.target.value)}
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-custom-black dark:text-custom-white bg-custom-white dark:bg-white/10 bg-clip-padding border-2 border-solid border-transparent rounded-sm transition ease-in-out m-0 focus:ring-0 focus:border-custom-main focus:outline-none'
                    placeholder='ender password'
                  />
                </div>
                <button
                    type='button'
                    className='mt-8 ml-2'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlash className='w-5 hover:text-custom-main'/> : <Eye className='w-5 hover:text-custom-main'/>}
                </button>
              </div>
              <div>
                {(passwordAlert != '' ? <div className='text-xs ml-2 text-red-600'>{passwordAlert}</div> : '')}
              </div>

              <div className='text-center mt-6'>
                <Btn onclick={(event) => handleSubmit(event)} label='change' icon={undefined} />
              </div>
            </form>


            <div className='mt-10 text-xs'>
              <h6 className='font-semibold'>Correct password:</h6>
              <ul>
                <li>should contain 8 - 100 characters</li>
                <li>should contain uppercase and lowercase letters</li>
                <li>should contain at least 1 digit</li>
                <li>should not contain spaces</li>
              </ul>
            </div>
          </div>

        </div>
        <div className='flex justify-center'>
          <History />
        </div>
      </div>
    </div>
  );
};
