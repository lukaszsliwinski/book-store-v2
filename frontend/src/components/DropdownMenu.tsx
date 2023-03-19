import { ReactComponent as ArrowDown } from '../assets/svg/arrowdown.svg';

export default function DropdownMenu({
  label,
  children
}: {
  label: string;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className="dropdown relative mx-1">
      <button
        className="dropdown-toggle text-custom-white hover:text-custom-main hover:bg-custom-white/10 focus:bg-custom-white/10 active:bg-custom-white/10 shadow-dark flex whitespace-nowrap rounded-sm bg-transparent px-6 py-2.5 text-xs font-medium uppercase leading-tight transition duration-150 ease-in-out focus:outline-none focus:ring-0"
        data-bs-toggle="dropdown"
      >
        <div className="xs:max-w-full flex max-w-[50px] items-center">
          <span className="overflow-hidden text-ellipsis">{label}</span>
        </div>
        <div className="flex items-center">
          <ArrowDown className="ml-2 w-2" />
        </div>
      </button>
      <ul className="dropdown-menu bg-custom-black dark:shadow-dark absolute z-50 float-left m-0 mt-1 hidden min-w-full list-none rounded-sm border-none bg-clip-padding py-2 text-left shadow-md">
        {children}
      </ul>
    </div>
  );
}
