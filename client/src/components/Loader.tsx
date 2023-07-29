export default function Loader() {
  return (
    <div className="col-span-3 mt-4 flex justify-center text-teal-700">
      <div
        className="spinner-grow m-1 inline-block h-4 w-4 rounded-full bg-current opacity-0"
        role="status"
      ></div>
      <div
        className="spinner-grow m-1 inline-block h-4 w-4 rounded-full bg-current opacity-0"
        role="status"
        style={{ animationDelay: '.1s' }}
      ></div>
      <div
        className="spinner-grow m-1 inline-block h-4 w-4 rounded-full bg-current opacity-0"
        role="status"
        style={{ animationDelay: '.2s' }}
      ></div>
    </div>
  );
}
