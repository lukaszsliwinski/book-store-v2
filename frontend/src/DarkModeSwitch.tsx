import Cookies from 'universal-cookie';

import { ReactComponent as Moon } from './assets/moon.svg';
import { ReactComponent as Sun } from './assets/sun.svg';

const cookies = new Cookies();

function DarkModeSwitch({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: React.Dispatch<React.SetStateAction<boolean>> }) {
  const toggleMode = () => {
    setDarkMode(!darkMode);
    localStorage.getItem('mode') === 'dark' ? localStorage.setItem('mode', 'light') : localStorage.setItem('mode', 'dark');
  };

  return (
    <div onClick={() => toggleMode()}>
      <div className='relative mx-2 h-6 w-11 rounded-xl p-1 cursor-pointer bg-custom-white before:absolute before:z-[2] before:block before:h-4 before:w-4 before:rounded-lg before:bg-custom-black before:transition-transform before:duration-100 before:ease-linear before:content-[""] before:dark:translate-x-5'>
        <div className="flex h-full items-center justify-between text-custom-black">
          <Sun className='z-0 h-4 w-4' />
          <Moon className='z-0 h-4 w-4' />
        </div>
      </div>
    </div>
  );
}

export default DarkModeSwitch;
