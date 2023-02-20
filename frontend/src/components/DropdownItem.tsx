export default function DropdownItem({ onclick, href, label, icon }: { onclick: React.MouseEventHandler | undefined, href: string, label: string, icon: JSX.Element | undefined } ) {
  return (
    <li>
      <a
        className='dropdown-item text-xs py-2 px-4 font-normal inline-flex w-full whitespace-nowrap bg-transparent text-custom-white hover:text-custom-main hover:bg-custom-white/10 focus:bg-custom-white/10 focus:outline-none focus:ring-0 active:bg-custom-white/10'
        href={href}
        onClick={onclick}
      >
        <div className='flex items-center h-full uppercase'>{label}</div>
        <div className='flex items-center h-full ml-auto'>{icon}</div>
      </a>
    </li>
  );
};
