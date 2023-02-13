import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { ReactComponent as Eye } from './assets/eye.svg';
import { ReactComponent as EyeSlash } from './assets/eyeslash.svg';
import Btn from './Btn';
import History from './History';
import { alertActions } from './store/alertSlice';

export default function Profile({ token, username }: { token: string, username: string }) {
  // state
  const [password, setPassword] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // dispatch functions from alert slice
  const dispatch = useDispatch();
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setPasswordAlert('');

    if (password === '') {
      setPasswordAlert('provide a password');
    } else {
      const axiosChangePasswordConfig = {
        method: 'post',
        url: '/api/change-password',
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
          setAlertMessage(result.data.message);
          setShowAlert(true);
        })
        .catch((error) => {
          setPasswordAlert(error.response.data.message);
        });
    };
  };

  return (
    <div className='mx-auto my-4 md:w-3/4 p-6 rounded-lg bg-white dark:bg-custom-black text-custom-black dark:text-custom-white shadow-lg'>
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
                    name='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-custom-black bg-custom-white bg-clip-padding border-2 border-solid border-transparent rounded transition ease-in-out m-0 focus:ring-0 focus:border-custom-main focus:outline-none'
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
          <History token={token} />
        </div>
      </div>
    </div>
  );
};
