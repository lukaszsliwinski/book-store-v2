export default function Link({ href, label, icon }: { href: string, label: string, icon: JSX.Element | undefined }) {
  return (
    <a
      href={href}
      type='button'
      className='inline-flex mx-1 px-6 py-2.5 bg-transparent text-custom-white font-medium text-xs leading-none uppercase rounded shadow-md hover:text-custom-main hover:bg-custom-gray focus:bg-custom-gray focus:outline-none focus:ring-0 active:bg-custom-gray transition duration-150 ease-in-out'
    >
      <div className='flex items-center'>{label}</div>
      <div className='flex items-center'>{icon}</div>
    </a>
  );
};
