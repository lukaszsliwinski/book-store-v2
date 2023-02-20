import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowSize, useOnClickOutside } from 'usehooks-ts';

import { ReactComponent as ArrowLeft } from '../assets/svg/arrowleft.svg';
import { ReactComponent as ArrowRight } from '../assets/svg/arrowright.svg';
import { IRootState } from '../store';
import { asideActions } from '../store/asideSlice';

export default function Aside() {
  // global state
  const showAside = useSelector((state: IRootState) => state.aside.showAside);

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setShowAside = (value: boolean) => dispatch(asideActions.setShowAside(value));

  // aside ref and click outside handler
  const asideRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(asideRef, () => {
    if (width < 1536) setShowAside(false);
  });

  // get screen size
  const { width } = useWindowSize();

  // aside always visible on 2xl screen
  useEffect(() => {
    width < 1536 ? setShowAside(false) : setShowAside(true);
  }, [width]);

  return (
    <div
      ref={asideRef}
      className={`
        dark:bg-custom-black text-custom-black dark:text-custom-white fixed z-20 h-screen w-[280px] bg-white shadow-md transition-all duration-500
        ${showAside ? '' : '-ml-[240px]'}`}
    >
      <div
        className={`
          flex
          ${showAside ? 'justify-center' : 'justify-end'}`}
      >
        <button className="hover:text-custom-main m-5" onClick={() => setShowAside(!showAside)}>
          {showAside ? (
            <ArrowLeft className="block w-6" />
          ) : (
            <ArrowRight className="-mr-3 block w-6" />
          )}
        </button>
      </div>
      <div
        className={`
          transition-colors duration-500
          ${showAside ? '' : 'dark:text-custom-black select-none text-white'}
        `}
      >
        <p className="px-8 text-justify text-sm">
          Hello! My name is Łukasz and I'm&nbsp;Frontend Developer. This app is a&nbsp;part of my
          portfolio that I&nbsp;have made while improving my coding skills.
          <br />
          The application is a&nbsp;simulation of an online book store. You can create an account,
          find a&nbsp;book, add books to cart and make fictitious order. In your profile page you
          can change password and see the history of your orders. Read more about me and see my
          other web apps with source codes at:
          <br />
        </p>
        <a
          href="https://lukaszsliwinski.pl"
          className="w-100 hover:text-custom-main mt-4 block cursor-pointer text-center font-bold underline underline-offset-2"
        >
          www.lukaszsliwinski.pl
        </a>
      </div>
    </div>
  );
}
