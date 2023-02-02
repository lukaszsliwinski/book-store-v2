export default function Btn({ href, label, icon }: { href: string, label: string, icon: JSX.Element | undefined }) {
  return (
    <a
      href={href}
      type='button'
      className='inline-flex items-center mx-1 px-6 py-2.5 bg-transparent text-[#f6f6f6] font-medium text-xs leading-none uppercase rounded shadow-md hover:text-[#408697] hover:bg-[#f6f6f6]/10 focus:bg-[#f6f6f6]/10 focus:outline-none focus:ring-0 active:bg-[#f6f6f6]/10 transition duration-150 ease-in-out'
    >{label}{icon}</a>
  );
};
