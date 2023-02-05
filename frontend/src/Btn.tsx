export default function Btn({ onclick, label, icon }: { onclick: React.MouseEventHandler, label: string, icon: JSX.Element | undefined }) {
  return (
    <button
      className='inline-flex mx-1 px-6 py-2.5 bg-custom-main text-custom-white font-medium text-xs leading-none uppercase rounded shadow-md hover:text-custom-main hover:bg-custom-white/10 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
      onClick={onclick}
    >
      <div className='flex items-center'>{label}</div>
      <div className='flex items-center'>{icon}</div>
    </button>
  );
};
