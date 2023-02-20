export default function Loader() {
  return (
    <div className="text-custom-main col-span-3 mt-4 flex justify-center">
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
