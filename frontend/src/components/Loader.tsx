export default function Loader() {
  return (
    <div className='col-span-3 mt-4 flex justify-center text-custom-main'>
      <div className='spinner-grow inline-block m-1 w-4 h-4 bg-current rounded-full opacity-0' role='status'></div>
      <div className='spinner-grow inline-block m-1 w-4 h-4 bg-current rounded-full opacity-0' role='status' style={{ animationDelay: '.1s' }}></div>
      <div className='spinner-grow inline-block m-1 w-4 h-4 bg-current rounded-full opacity-0' role='status' style={{ animationDelay: '.2s' }}></div>
    </div>
  );
};
