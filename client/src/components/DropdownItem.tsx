import { Link } from 'react-router-dom';

export default function DropdownItem({
  onclick,
  href,
  label,
  icon
}: {
  onclick: React.MouseEventHandler | undefined;
  href: string;
  label: string;
  icon: JSX.Element | undefined;
}) {
  return (
    <li>
      <Link
        className="dropdown-item inline-flex w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs font-normal text-neutral-50 hover:bg-neutral-50/10 hover:text-teal-700 focus:bg-neutral-50/10 focus:outline-none focus:ring-0 active:bg-neutral-50/10"
        to={href}
        onClick={onclick}
      >
        <div className="flex h-full items-center uppercase">{label}</div>
        <div className="ml-auto flex h-full items-center">{icon}</div>
      </Link>
    </li>
  );
}
