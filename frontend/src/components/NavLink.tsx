import { Link } from 'react-router-dom';

export default function NavLink({
  href,
  label,
  icon
}: {
  href: string;
  label: string;
  icon: JSX.Element | undefined;
}) {
  return (
    <Link
      to={href}
      role="button"
      className="xs:px-6 shadow-dark mx-1 inline-flex rounded-sm bg-transparent px-3 py-2.5 text-xs font-medium uppercase leading-none text-neutral-50 transition duration-150 ease-in-out hover:bg-zinc-900 hover:text-teal-700 focus:bg-zinc-900 focus:outline-none focus:ring-0 active:bg-zinc-900"
    >
      <div className="xs:flex hidden items-center">{label}</div>
      <div className="xs:ml-2 xs:w-3 flex w-4 items-center">{icon}</div>
    </Link>
  );
}
