import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

import { ReactComponent as Book } from './assets/book.svg';
import { ReactComponent as Login } from './assets/login.svg';
import { ReactComponent as Register } from './assets/register.svg';
import { ReactComponent as Cart } from './assets/cart.svg';
import { ReactComponent as ArrowDown } from './assets/arrowdown.svg';
import { ReactComponent as Profile } from './assets/profile.svg';
import { ReactComponent as Logout } from './assets/logout.svg';

import Link from './Link';
import DarkModeSwitch from './DarkModeSwitch';
import { alertActions } from './store/alertSlice';

const cookies = new Cookies();

export default function Header({darkMode, setDarkMode, logged, username, badge }: { darkMode: boolean, setDarkMode: React.Dispatch<React.SetStateAction<boolean>>, logged: boolean, username: string, badge: string }) {
  // dispatch functions from alert slice
  const dispatch = useDispatch();
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));

  const logout = () => {
    cookies.remove('TOKEN', { path: '/' });
    localStorage.removeItem('cart');
    window.location.href = '/';
    setAlertMessage('Succesfully logged out!');
    setShowAlert(true);
  };

  return (
    <nav className='fixed z-20 top-0 flex justify-between items-center w-full bg-custom-black px-6 py-2'>
      <a href='/' className='inline-flex text-custom-white font-semibold'>
        <div className='inline-flex items-center h-full'><Book className='inline-block mr-2 w-5'/></div>
        <div className='inline-flex items-center h-full'>BOOK STORE</div>
      </a>
      <div className='flex items-center'>
        {!logged ? (
          <div>
            <Link href='/login' label='login' icon={<Login className='inline-block ml-2 w-3' />} />
            <Link href='/register' label='register' icon={<Register className='inline-block ml-2 w-2.5' />}/>
          </div>
        ) : (
          <div className='flex items-center'>
            <a href='/cart' className='relative inline-block mx-1 px-4 py-2 bg-transparent text-custom-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:text-custom-main hover:bg-custom-white/10 focus:bg-custom-white/10 focus:outline-none focus:ring-0 active:bg-custom-white/10 transition duration-150 ease-in-out'>
              <Cart className='w-[21.5px]'/>
              <span className='absolute top-[2px] right-[2px] inline-block py-0.5 px-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-[.6rem] bg-red-600 text-custom-white rounded ml-2'>{badge}</span>
            </a>
            <div className='dropdown relative mx-1'>
              <button
                className='dropdown-toggle px-6 py-2.5 bg-transparent text-custom-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:text-custom-main hover:bg-custom-white/10 focus:bg-custom-white/10 focus:outline-none focus:ring-0 active:bg-custom-white/10 transition duration-150 ease-in-out flex whitespace-nowrap'
                data-bs-toggle="dropdown"
              >
                <div className='flex items-center'>{username}</div>
                <div className='flex items-center'><ArrowDown className='ml-1 w-2'/></div>
              </button>
              <ul className='dropdown-menu min-w-full absolute hidden bg-custom-black z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none'>
                <li>
                  <a
                    className='dropdown-item text-xs py-2 px-4 font-normal inline-flex w-full whitespace-nowrap bg-transparent text-custom-white hover:text-custom-main hover:bg-custom-white/10 focus:bg-custom-white/10 focus:outline-none focus:ring-0 active:bg-custom-white/10'
                    href='/profile'
                  >
                    <div className='flex items-center h-full'>PROFILE</div>
                    <div className='flex items-center h-full'><Profile className='inline-block ml-4 w-3.5'/></div>
                  </a>
                </li>
                <li>
                  <button
                    className='dropdown-item text-xs py-2 px-4 font-normal inline-flex w-full whitespace-nowrap bg-transparent text-custom-white hover:text-custom-main hover:bg-custom-white/10 focus:bg-custom-white/10 focus:outline-none focus:ring-0 active:bg-custom-white/10 cursor-pointer'
                    onClick={() => logout()}
                  >
                    <div className='flex items-center h-full'>LOGOUT</div>
                    <div className='flex items-center h-full'><Logout className='inline-block ml-4 w-3.5'/></div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
        <DarkModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </nav>
  );
};
