export default function Link({
  href,
  label,
  icon
}: {
  href: string;
  label: string;
  icon: JSX.Element | undefined;
}) {
  return (
    <a
      href={href}
      type="button"
      className="xs:px-6 text-custom-white hover:text-custom-main hover:bg-custom-gray focus:bg-custom-gray active:bg-custom-gray shadow-dark mx-1 inline-flex rounded-sm bg-transparent px-3 py-2.5 text-xs font-medium uppercase leading-none transition duration-150 ease-in-out focus:outline-none focus:ring-0"
    >
      <div className="xs:flex hidden items-center">{label}</div>
      <div className="xs:ml-2 xs:w-3 flex w-4 items-center">{icon}</div>
    </a>
  );
}
