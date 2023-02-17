import { useState } from "react";

export default function Aside() {
  const [show, setShow] = useState(true);

  return (
    <div
      className={`
        w-72 h-screen shadow-md bg-white dark:bg-custom-black text-custom-black dark:text-custom-white px-6 pt-12 fixed transition-all duration-500
        ${show ? '' : '-ml-60'}`}
    >
      <p className='text-justify text-sm'>
        Hello! My name is Łukasz and I'm&nbsp;Frontend Developer.
        This app is a&nbsp;part of my portfolio that I&nbsp;have made while improving my coding skills.<br />
        The application is a&nbsp;simulation of an online book store. You can create an account, find a&nbsp;book,
        add books to cart and make fictitious order. In your profile page you can change password
        and see the history of your orders.
        Read more about me and see my other web apps with source codes&nbsp;at:<br />
      </p>
      <a href='https://lukaszsliwinski.pl' className='block w-100 text-center mt-4 cursor-pointer font-bold underline underline-offset-2 hover:text-custom-main'>www.lukaszsliwinski.pl</a>
      {/* <div className='flex justify-end'>
        <button onClick={() => setShow(!show)}>show/hide</button>
      </div> */}
    </div>
  );
};
