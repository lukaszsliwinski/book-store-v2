import { ReactComponent as Moon } from './assets/moon.svg';
import { ReactComponent as Sun } from './assets/sun.svg';

function DarkModeSwitch({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div onClick={() => setDarkMode(!darkMode)}>
      <div className='relative mx-2 h-6 w-11 rounded-xl p-1 cursor-pointer bg-[#f6f6f6] before:absolute before:z-[2] before:block before:h-4 before:w-4 before:rounded-lg before:bg-[#363538] before:transition-transform before:duration-100 before:ease-linear before:content-[""] before:dark:translate-x-5'>
        <div className="flex h-full items-center justify-between text-[#363538]">
          <Sun className='z-0 h-4 w-4' />
          <Moon className='z-0 h-4 w-4' />
        </div>
      </div>
    </div>
  );
}

export default DarkModeSwitch;
