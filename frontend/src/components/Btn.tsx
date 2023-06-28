export default function Btn({
  role,
  onclick,
  label,
  icon
}: {
  role?: string;
  onclick: React.MouseEventHandler;
  label: string;
  icon: JSX.Element | undefined;
}) {
  return (
    <button
      role={role ? role : 'button'}
      className="mx-1 inline-flex rounded-sm bg-teal-700 px-6 py-2.5 text-xs font-medium uppercase leading-none text-neutral-50 shadow-md transition duration-150 ease-in-out hover:bg-teal-800 focus:outline-none focus:ring-0"
      onClick={onclick}
    >
      <div className="flex items-center">{label}</div>
      <div className="flex items-center">{icon}</div>
    </button>
  );
}
