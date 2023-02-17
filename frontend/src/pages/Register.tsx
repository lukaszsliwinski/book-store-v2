import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { ReactComponent as Eye } from '../assets/svg/eye.svg';
import { ReactComponent as EyeSlash } from '../assets/svg/eyeslash.svg';
import { IRootState } from '../store';
import { alertActions } from '../store/alertSlice';
import { authActions } from '../store/authSlice';
import Btn from '../components/Btn';

const cookies = new Cookies();

export default function Register() {
  // local state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameAlert, setUsernameAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // global state
  const logged = useSelector((state: IRootState) => state.auth.logged);

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setError = (value: boolean) => dispatch(alertActions.setError(value));
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));
  const setLogged = (value: boolean) => dispatch(authActions.setLogged(value));

  // redirect to profile page if user is logged in
  if (logged) window.location.href = '/profile';

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setUsernameAlert('');
    setPasswordAlert('');

    if (usernameInput === '' || passwordInput === '') {
      if (usernameInput === '') setUsernameAlert('provide an username');
      if (passwordInput === '') setPasswordAlert('provide a password');
    } else {
      const axiosRegisterConfig = {
        method: 'post',
        url: '/api/register',
        data: {
          usernameInput,
          passwordInput
        }
      };

      const axiosLoginConfig = {
        method: 'post',
        url: '/api/login',
        data: {
          usernameInput,
          passwordInput
        }
      };

      axios(axiosRegisterConfig)
        .then((result) => {
          setAlertMessage(result.data.message);
          setShowAlert(true);

          // login automatically after successful registration
          axios(axiosLoginConfig)
            .then((result) => {
              setUsernameInput('');
              setPasswordInput('');
              cookies.set('TOKEN', result.data.token, {path: '/'});
              setLogged(true);
            })
            .catch(() => {
              setError(true);
              setAlertMessage('Authentication error - please try again later!');
              setShowAlert(true);
            });
          setUsernameInput('');
          setPasswordInput('');
        })
        .catch((error) => {
          if (error.response.data.item === 'username') {
            setUsernameAlert(error.response.data.message);
          } else if (error.response.data.item === 'password') {
            setPasswordAlert(error.response.data.message);
          } else {
            setError(true);
            setAlertMessage('Authentication error - please try again later!');
            setShowAlert(true);
          };
        });
    };
  };

  return (
    <div className='block p-6 rounded-sm shadow-md bg-white dark:bg-custom-black text-custom-black dark:text-custom-white xs:mx-auto mx-1 my-4 max-w-screen-xs'>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h4 className='text-center font-bold text-custom-main'>REGISTER</h4>
        <div className='grid grid-cols-12 form-group'>
          <div className='col-start-2 col-span-10'>
            <label className='form-label inline-block mb-2 ml-2 text-xs font-semibold'>username</label>
            <input
              type='text'
              value={usernameInput}
              onChange={(event) => setUsernameInput(event.target.value)}
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-custom-black dark:text-custom-white bg-custom-white dark:bg-white/10 bg-clip-padding border-2 border-solid border-transparent rounded-sm transition ease-in-out m-0 focus:ring-0 focus:border-custom-main focus:outline-none'
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
