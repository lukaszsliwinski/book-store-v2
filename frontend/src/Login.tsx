import { useState } from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';
import { ILoggedState } from './types';

import { ReactComponent as Eye } from './assets/eye.svg';
import { ReactComponent as EyeSlash } from './assets/eyeslash.svg';
import Btn from './Btn';

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
      const axiosLoginConfig = {
        method: 'post',
        url: '/api/login',
        data: {
          username,
          password
        }
      };

      axios(axiosLoginConfig)
        .then((result) => {
          setUsername('');
          setPassword('');
          localStorage.clear();
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
    <div className='block p-6 rounded-lg shadow-lg bg-white mx-auto my-4 sm:max-w-[400px]'>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h4 className='text-center font-bold text-[#408697]'>LOGIN</h4>
        <div className='grid grid-cols-12 form-group'>
          <div className='col-start-2 col-span-10'>
            <label className='form-label inline-block mb-2 ml-2 text-xs font-semibold text-[#363538]'>username</label>
            <input
              type='text'
              name='username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-[#363538] bg-[#f6f6f6] bg-clip-padding border-2 border-solid border-transparent rounded transition ease-in-out m-0 focus:ring-0 focus:border-[#408697] focus:outline-none'
              placeholder='enter username'
            />
          </div>
        </div>
        <div className='grid grid-cols-12'>
          {(usernameAlert != '' ? <div className='col-start-2 col-span-10 ml-2 text-xs text-red-800'>{usernameAlert}</div> : '')}
        </div>

        <div className='grid grid-cols-12 form-group mt-6'>
          <div className='col-start-2 col-span-10'>
            <label className='form-label inline-block mb-2 ml-2 text-xs font-semibold text-[#363538]'>password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-[#363538] bg-[#f6f6f6] bg-clip-padding border-2 border-solid border-transparent rounded transition ease-in-out m-0 focus:ring-0 focus:border-[#408697] focus:outline-none'
              placeholder='ender password'
            />
          </div>
          <button
              type='button'
              className='mt-8 ml-2 text-[#363538]'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash className='w-[22px] hover:text-[#408697]'/> : <Eye className='w-5 hover:text-[#408697]'/>}
          </button>
        </div>
        <div className='grid grid-cols-12'>
          {(passwordAlert != '' ? <div className='col-start-2 col-span-10 text-xs ml-2 text-red-800'>{passwordAlert}</div> : '')}
        </div>

        <div className='text-center mt-10'>
          <Btn onclick={(event) => handleSubmit(event)} label='login' icon={undefined} />
          <div className='text-xs mt-2'>Don't have an account? <a href='/register' className='font-bold underline underline-offset-2 text-[#363538] hover:text-[#408697]'>register</a></div>
        </div>
      </form>
    </div>
  );
};
