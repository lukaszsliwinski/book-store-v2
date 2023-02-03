import Cookies from 'universal-cookie';

import { ReactComponent as Book } from './assets/book.svg';
import { ReactComponent as Login } from './assets/login.svg';
import { ReactComponent as Register } from './assets/register.svg';
import { ReactComponent as Cart } from './assets/cart.svg';
import { ReactComponent as Arrow } from './assets/arrow.svg';
import { ReactComponent as Profile } from './assets/profile.svg';
import { ReactComponent as Logout } from './assets/logout.svg';

import Btn from './Btn';

const cookies = new Cookies();

export default function Header({ logged, username, badge }: { logged: boolean, username: string, badge: string }) {
  const logout = () => {
    cookies.remove('TOKEN', { path: '/' });
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav className='sticky top-0 flex justify-between items-center bg-[#363538] px-6 py-2'>
      <a href='/' className='inline-flex text-[#f6f6f6] font-semibold'>
        <div className='inline-flex items-center h-full'><Book className='inline-block mr-2 w-5'/></div>
        <div className='inline-flex items-center h-full'>BOOK STORE</div>
      </a>
      {!logged ? (
        <div>
          <Btn href='/login' label='login' icon={<Login className='inline-block ml-2 w-3' />} />
          <Btn href='/register' label='register' icon={<Register className='inline-block ml-2 w-2.5' />}/>
        </div>
      ) : (
        <div className='flex items-center'>
          <a href='/cart' className='relative inline-block mx-1 px-4 py-2 bg-transparent text-[#f6f6f6] font-medium text-xs leading-tight uppercase rounded shadow-md hover:text-[#408697] hover:bg-[#f6f6f6]/10 focus:bg-[#f6f6f6]/10 focus:outline-none focus:ring-0 active:bg-[#f6f6f6]/10 transition duration-150 ease-in-out'>
            <Cart className='w-[21.5px]'/>
            <span className='absolute top-[2px] right-[2px] inline-block py-0.5 px-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-[.6rem] bg-red-600 text-[#f6f6f6] rounded ml-2'>{badge}</span>
          </a>
          <div className='dropdown relative mx-1'>
            <button
              className='dropdown-toggle px-6 py-2.5 bg-transparent text-[#f6f6f6] font-medium text-xs leading-tight uppercase rounded shadow-md hover:text-[#408697] hover:bg-[#f6f6f6]/10 focus:bg-[#f6f6f6]/10 focus:outline-none focus:ring-0 active:bg-[#f6f6f6]/10 transition duration-150 ease-in-out flex whitespace-nowrap'
              data-bs-toggle="dropdown"
            >
              <div className='flex items-center'>{username}</div>
              <div className='flex items-center'><Arrow className='ml-1 w-2'/></div>
            </button>
            <ul className='dropdown-menu min-w-full absolute hidden bg-[#363538] z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none'>
              <li>
                <a
                  className='dropdown-item text-xs py-2 px-4 font-normal inline-flex w-full whitespace-nowrap bg-transparent text-[#f6f6f6] hover:text-[#408697] hover:bg-[#f6f6f6]/10 focus:bg-[#f6f6f6]/10 focus:outline-none focus:ring-0 active:bg-[#f6f6f6]/10'
                  href='/profie'
                >
                  <div className='flex items-center h-full'>PROFILE</div>
                  <div className='flex items-center h-full'><Profile className='inline-block ml-4 w-3.5'/></div>
                </a>
              </li>
              <li>
                <a
                  className='dropdown-item text-xs py-2 px-4 font-normal inline-flex w-full whitespace-nowrap bg-transparent text-[#f6f6f6] hover:text-[#408697] hover:bg-[#f6f6f6]/10 focus:bg-[#f6f6f6]/10 focus:outline-none focus:ring-0 active:bg-[#f6f6f6]/10 cursor-pointer'
                  onClick={() => logout()}
                  >
                    <div className='flex items-center h-full'>LOGOUT</div>
                    <div className='flex items-center h-full'><Logout className='inline-block ml-4 w-3.5'/></div>
                  </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};
