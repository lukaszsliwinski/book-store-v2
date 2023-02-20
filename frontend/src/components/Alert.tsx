import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IRootState } from '../store';
import { alertActions } from '../store/alertSlice';

export default function Alert() {
  // global state
  const error = useSelector((state: IRootState) => state.alert.error);
  const alertMessage = useSelector((state: IRootState) => state.alert.alertMessage);
  const showAlert = useSelector((state: IRootState) => state.alert.showAlert);

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setError = (value: boolean) => dispatch(alertActions.setError(value));
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));

  // hide alert after 4 seconds
  useEffect(() => {
    if (showAlert !== false) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        setError(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div
      className={`
      fixed bottom-0 mb-3 flex w-full justify-center
      ${showAlert ? 'z-30' : '-z-10'}
    `}
    >
      <div
        role="alert"
        className={`
          alert text-custom-white alert-dismissible fade inline-flex items-center rounded-sm py-5 px-6 text-base
          ${error ? 'bg-red-600' : 'bg-custom-main'}
          ${showAlert ? 'show' : ''}
        `}
      >
        <strong>{alertMessage}</strong>
      </div>
    </div>
  );
}
