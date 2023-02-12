import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IRootState } from './store';
import { alertActions } from './store/alertSlice';

export default function Alert() {
  // assign state to values
  const showAlert = useSelector((state: IRootState) => state.alert.showAlert);
  const alertMessage = useSelector((state: IRootState) => state.alert.alertMessage);

  const dispatch = useDispatch();

  // dispatch functions from alert slice
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(false), 5000);
    return () => clearTimeout(timer);
  }, [showAlert])

  return (
    <div className='fixed bottom-0 z-10 flex w-full justify-center mb-3'>
      <div
        className={`
          alert bg-custom-main rounded-lg py-5 px-6 text-base text-custom-white inline-flex items-center alert-dismissible fade
          ${showAlert ? 'show' : ''}
        `}
        role='alert'
      >
        <div className='font-bold mr-4'>{alertMessage}</div>
        <button
          type='button'
          className='btn-close box-content w-4 h-4 p-1 ml-auto border-none rounded-none opacity-50 focus:shadow-none focus:outline-none hover:opacity-75 hover:no-underline'
          data-bs-dismiss='alert'
          aria-label='Close'
        ></button>
      </div>
    </div>
  );
};
