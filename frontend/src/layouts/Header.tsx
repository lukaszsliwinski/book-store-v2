import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

import { ReactComponent as Book } from '../assets/svg/book.svg';
import { ReactComponent as Login } from '../assets/svg/login.svg';
import { ReactComponent as Register } from '../assets/svg/register.svg';
import { ReactComponent as Cart } from '../assets/svg/cart.svg';
import { ReactComponent as Profile } from '../assets/svg/profile.svg';
import { ReactComponent as Logout } from '../assets/svg/logout.svg';
import { IRootState } from '../store';
import { alertActions } from '../store/alertSlice';
import { badgeActions } from '../store/badgeSlice';
import { authActions } from '../store/authSlice';
import NavLink from '../components/NavLink';
import DarkModeSwitch from '../components/DarkModeSwitch';
import DropdownMenu from '../components/DropdownMenu';
import DropdownItem from '../components/DropdownItem';

const cookies = new Cookies();

export default function Header() {
  // global state
  const badge = useSelector((state: IRootState) => state.badge.badge);
  const logged = useSelector((state: IRootState) => state.auth.logged);
  const username = useSelector((state: IRootState) => state.auth.username);

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));
  const setBadge = (value: number) => dispatch(badgeActions.setBadge(value));
  const setLogged = (value: boolean) => dispatch(authActions.setLogged(value));

  const logout = () => {
    cookies.remove('TOKEN', { path: '/' });
    localStorage.removeItem('cart');
    setBadge(0);
    window.location.href = '/';
    setLogged(false);
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
            <NavLink href='/login' label='login' icon={<Login className='inline-block ml-2 w-3' />} />
            <NavLink href='/register' label='register' icon={<Register className='inline-block ml-2 w-2.5' />}/>
          </div>
        ) : (
          <div className='flex items-center'>
            <a href='/cart' className='relative inline-block mx-1 px-4 py-2 bg-transparent text-custom-white font-medium text-xs leading-tight uppercase rounded-sm shadow-md hover:text-custom-main hover:bg-custom-white/10 focus:bg-custom-white/10 focus:outline-none focus:ring-0 active:bg-custom-white/10 transition duration-150 ease-in-out'>
              <Cart className='w-[21.5px]'/>
              <span className='absolute top-[2px] right-[2px] inline-block py-0.5 px-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-[.6rem] bg-red-600 text-custom-white rounded ml-2'>{badge}</span>
            </a>
            <DropdownMenu label={username}>
              <DropdownItem onclick={undefined} href='/profile' label='profile' icon={<Profile className='inline-block ml-4 w-3.5'/>} />
              <DropdownItem onclick={() => logout()} href='' label='logout' icon={<Logout className='inline-block ml-4 w-3.5'/>} />
            </DropdownMenu>
          </div>
        )}
        <DarkModeSwitch />
      </div>
    </nav>
  );
};
