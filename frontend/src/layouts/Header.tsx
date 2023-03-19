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

  // logout user and clear cart
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
    <nav className="bg-custom-black fixed top-0 z-30 flex w-full items-center justify-between px-2.5 py-2">
      <a href="/" className="text-custom-white inline-flex font-semibold">
        <div className="inline-flex h-full items-center">
          <Book className="mr-2 inline-block w-5" />
        </div>
        <div className="hidden h-full items-center sm:inline-flex">BOOK STORE</div>
      </a>
      <div className="flex items-center">
        {!logged ? (
          <div>
            <NavLink href="/login" label="login" icon={<Login />} />
            <NavLink href="/register" label="register" icon={<Register />} />
          </div>
        ) : (
          <div className="flex items-center">
            <a
              href="/cart"
              className="text-custom-white hover:text-custom-main hover:bg-custom-white/10 focus:bg-custom-white/10 active:bg-custom-white/10 dark:shadow-dark relative mx-1 inline-block rounded-sm bg-transparent px-4 py-2 text-xs font-medium uppercase leading-tight shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-0"
            >
              <Cart className="w-[21.5px]" />
              <span className="text-custom-white absolute top-[2px] right-[2px] ml-2 inline-block whitespace-nowrap rounded bg-red-600 py-0.5 px-1 text-center align-baseline text-[.6rem] font-bold leading-none">
                {badge}
              </span>
            </a>
            <DropdownMenu label={username}>
              <DropdownItem
                onclick={undefined}
                href="/profile"
                label="profile"
                icon={<Profile className="ml-4 inline-block w-3.5" />}
              />
              <DropdownItem
                onclick={() => logout()}
                href=""
                label="logout"
                icon={<Logout className="ml-4 inline-block w-3.5" />}
              />
            </DropdownMenu>
          </div>
        )}
        <DarkModeSwitch />
      </div>
    </nav>
  );
}
