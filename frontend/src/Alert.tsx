import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IRootState } from './store';
import { alertActions } from './store/alertSlice';

export default function Alert() {
  // global state
  const showAlert = useSelector((state: IRootState) => state.alert.showAlert);
  const alertMessage = useSelector((state: IRootState) => state.alert.alertMessage);

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));

  useEffect(() => {
    if (showAlert !== false) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    };
  }, [showAlert]);

  return (
    <div className={`
      fixed bottom-0 z-10 flex w-full justify-center mb-3
      ${showAlert ? 'z-10' : '-z-10'}
    `}>
      <div
        role='alert'
        className={`
          alert bg-custom-main rounded-lg py-5 px-6 text-base text-custom-white inline-flex items-center alert-dismissible fade
          ${showAlert ? 'show' : ''}
        `}
      >
        <div className='font-bold mr-4'>{alertMessage}</div>
      </div>
    </div>
  );
};
