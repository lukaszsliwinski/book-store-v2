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
      <a
        className="dropdown-item text-custom-white hover:text-custom-main hover:bg-custom-white/10 focus:bg-custom-white/10 active:bg-custom-white/10 inline-flex w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs font-normal focus:outline-none focus:ring-0"
        href={href}
        onClick={onclick}
      >
        <div className="flex h-full items-center uppercase">{label}</div>
        <div className="ml-auto flex h-full items-center">{icon}</div>
      </a>
    </li>
  );
}
