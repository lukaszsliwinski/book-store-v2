export default function Btn({
  onclick,
  label,
  icon
}: {
  onclick: React.MouseEventHandler;
  label: string;
  icon: JSX.Element | undefined;
}) {
  return (
    <button
      className="bg-custom-main text-custom-white hover:bg-custom-main-hover mx-1 inline-flex rounded-sm px-6 py-2.5 text-xs font-medium uppercase leading-none shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-0"
      onClick={onclick}
    >
      <div className="flex items-center">{label}</div>
      <div className="flex items-center">{icon}</div>
    </button>
  );
}
