import { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ILoggedState } from './types';

import { ReactComponent as Eye } from './assets/eye.svg';
import { ReactComponent as EyeSlash } from './assets/eyeslash.svg';
import Btn from './Btn';

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
      const axiosRegisterConfig = {
        method: 'post',
        url: '/api/register',
        data: {
          username,
          password
        }
      };

      const axiosLoginConfig = {
        method: 'post',
        url: '/api/login',
        data: {
          username,
          password
        }
      };

      axios(axiosRegisterConfig)
        .then(() => {
          // login automatically after successful registration
          axios(axiosLoginConfig)
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
    <div className='block p-6 rounded-lg shadow-lg bg-white dark:bg-custom-black text-custom-black dark:text-custom-white mx-auto my-4 sm:max-w-[400px]'>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h4 className='text-center font-bold text-custom-main'>REGISTER</h4>
        <div className='grid grid-cols-12 form-group'>
          <div className='col-start-2 col-span-10'>
            <label className='form-label inline-block mb-2 ml-2 text-xs font-semibold'>username</label>
            <input
              type='text'
              name='username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-custom-black bg-custom-white bg-clip-padding border-2 border-solid border-transparent rounded transition ease-in-out m-0 focus:ring-0 focus:border-custom-main focus:outline-none'
              placeholder='enter username'
            />
          </div>
        </div>
        <div className='grid grid-cols-12'>
          {(usernameAlert != '' ? <div className='col-start-2 col-span-10 ml-2 text-xs text-red-600'>{usernameAlert}</div> : '')}
        </div>

        <div className='grid grid-cols-12 form-group mt-6'>
          <div className='col-start-2 col-span-10'>
            <label className='form-label inline-block mb-2 ml-2 text-xs font-semibold'>password</label>
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
              {showPassword ? <EyeSlash className='w-[22px] hover:text-custom-main'/> : <Eye className='w-5 hover:text-custom-main'/>}
          </button>
        </div>
        <div className='grid grid-cols-12'>
          {(passwordAlert != '' ? <div className='col-start-2 col-span-10 text-xs ml-2 text-red-600'>{passwordAlert}</div> : '')}
        </div>

        <div className='text-center mt-10'>
          <Btn onclick={(event) => handleSubmit(event)} label='register' icon={undefined} />
          <div className='text-xs mt-2'>Already have an account? <a href='/login' className='font-bold underline underline-offset-2 hover:text-custom-main'>login</a></div>
        </div>
      </form>

      <div className='mt-10 text-xs'>
        <h6 className='font-semibold'>Correct username:</h6>
        <ul>
          <li>should contain 3 - 30 characters</li>
          <li>should not contain spaces</li>
        </ul>
        <h6 className='mt-2 font-semibold'>Correct password:</h6>
        <ul>
          <li>should contain 8 - 100 characters</li>
          <li>should contain uppercase and lowercase letters</li>
          <li>should contain at least 1 digit</li>
          <li>should not contain spaces</li>
        </ul>
      </div>
    </div>
  );
};
