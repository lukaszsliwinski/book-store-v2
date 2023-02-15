import { ReactComponent as ArrowDown } from '../assets/svg/arrowdown.svg';

export default function DropdownMenu({ label, children }: { label: string, children: JSX.Element | JSX.Element[] }) {
  return (
    <div className='dropdown relative mx-1'>
      <button
        className='dropdown-toggle px-6 py-2.5 bg-transparent text-custom-white font-medium text-xs leading-tight uppercase rounded-sm shadow-md hover:text-custom-main hover:bg-custom-white/10 focus:bg-custom-white/10 focus:outline-none focus:ring-0 active:bg-custom-white/10 transition duration-150 ease-in-out flex whitespace-nowrap'
        data-bs-toggle='dropdown'
      >
        <div className='flex items-center'>{label}</div>
        <div className='flex items-center'><ArrowDown className='ml-1 w-2'/></div>
      </button>
      <ul className='dropdown-menu min-w-full absolute hidden bg-custom-black z-50 float-left py-2 list-none text-left rounded-sm shadow-md mt-1 m-0 bg-clip-padding border-none'>
        {children}
      </ul>
    </div>
  );
};
