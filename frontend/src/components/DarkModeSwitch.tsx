import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as Moon } from '../assets/svg/moon.svg';
import { ReactComponent as Sun } from '../assets/svg/sun.svg';
import { IRootState } from '../store';
import { modeActions } from '../store/modeSlice';

function DarkModeSwitch() {
  // global state
  const darkMode = useSelector((state: IRootState) => state.mode.darkMode);

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setDarkMode = (value: boolean) => dispatch(modeActions.setDarkMode(value));

  // toggle mode and save in local storage
  const toggleMode = () => {
    setDarkMode(!darkMode);
    localStorage.getItem('mode') === 'dark'
      ? localStorage.setItem('mode', 'light')
      : localStorage.setItem('mode', 'dark');
  };

  return (
    <div onClick={() => toggleMode()}>
      <div className="xs:scale-100 xs:mx-2 before:bg-zinc-950 relative h-6 w-11 scale-75 cursor-pointer rounded-xl bg-neutral-50 p-1 before:absolute before:z-[2] before:block before:h-4 before:w-4 before:rounded-lg before:transition before:duration-100 before:ease-linear before:content-[''] before:dark:translate-x-5">
        <div className="text-zinc-950 flex h-full items-center justify-between">
          <Sun className="z-0 h-4 w-4" />
          <Moon className="z-0 h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export default DarkModeSwitch;
