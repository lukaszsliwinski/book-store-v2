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

export default function Login() {
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

    // validate input values
    if (usernameInput === '' || passwordInput === '') {
      if (usernameInput === '') setUsernameAlert('provide an username');
      if (passwordInput === '') setPasswordAlert('provide a password');
    } else {
      // login post request
      const axiosLoginConfig = {
        method: 'post',
        url: '/api/login',
        data: {
          usernameInput,
          passwordInput
        }
      };

      axios(axiosLoginConfig)
        .then((result) => {
          setUsernameInput('');
          setPasswordInput('');
          localStorage.removeItem('cart');
          cookies.set('TOKEN', result.data.token, { path: '/' });
          setLogged(true);
          setAlertMessage(result.data.message);
          setShowAlert(true);
        })
        .catch((error) => {
          const errorMessage = error.response.data.message;
          if (errorMessage === 'user not found') {
            setUsernameAlert(errorMessage);
          } else if (errorMessage === 'wrong password') {
            setPasswordAlert(errorMessage);
          } else {
            setError(true);
            setAlertMessage('Authentication error - please try again later!');
            setShowAlert(true);
          }
        });
    }
  };

  return (
    <div className="dark:bg-custom-black text-custom-black dark:text-custom-white xs:mx-auto max-w-screen-xs mx-2 my-4 block rounded-sm bg-white p-6 shadow-md">
      <form onSubmit={(event) => handleSubmit(event)}>
        <h4 className="text-custom-main text-center font-bold">LOGIN</h4>
        <div className="form-group grid grid-cols-12">
          <div className="col-span-10 col-start-2">
            <label className="form-label mb-2 ml-2 inline-block text-xs font-semibold">
              username
            </label>
            <input
              type="text"
              value={usernameInput}
              onChange={(event) => setUsernameInput(event.target.value)}
              className="form-control text-custom-black dark:text-custom-white bg-custom-white focus:border-custom-main m-0 block w-full rounded-sm border-2 border-solid border-transparent bg-clip-padding px-3 py-1.5 text-base font-normal transition ease-in-out focus:outline-none focus:ring-0 dark:bg-white/10"
              placeholder="enter username"
            />
          </div>
        </div>
        <div className="grid grid-cols-12">
          {usernameAlert != '' ? (
            <div className="col-span-10 col-start-2 ml-2 text-xs text-red-600">{usernameAlert}</div>
          ) : (
            ''
          )}
        </div>

        <div className="form-group mt-6 grid grid-cols-12">
          <div className="col-span-10 col-start-2">
            <label className="form-label mb-2 ml-2 inline-block text-xs font-semibold">
              password
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
            className="mt-8 ml-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlash className="hover:text-custom-main w-[22px]" />
            ) : (
              <Eye className="hover:text-custom-main w-5" />
            )}
          </button>
        </div>
        <div className="grid grid-cols-12">
          {passwordAlert != '' ? (
            <div className="col-span-10 col-start-2 ml-2 text-xs text-red-600">{passwordAlert}</div>
          ) : (
            ''
          )}
        </div>

        <div className="mt-10 text-center">
          <Btn onclick={(event) => handleSubmit(event)} label="login" icon={undefined} />
          <div className="mt-2 text-xs">
            Don't have an account?{' '}
            <a
              href="/register"
              className="hover:text-custom-main font-bold underline underline-offset-2"
            >
              register
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
