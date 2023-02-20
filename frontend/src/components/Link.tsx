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
      className="text-custom-white hover:text-custom-main hover:bg-custom-gray focus:bg-custom-gray active:bg-custom-gray mx-1 inline-flex rounded-sm bg-transparent px-6 py-2.5 text-xs font-medium uppercase leading-none shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-0"
    >
      <div className="flex items-center">{label}</div>
      <div className="flex items-center">{icon}</div>
    </a>
  );
}
