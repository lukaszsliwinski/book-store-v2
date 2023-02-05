import { useState } from 'react';
import axios from 'axios';

import { ReactComponent as Eye } from './assets/eye.svg';
import { ReactComponent as EyeSlash } from './assets/eyeslash.svg';
import Btn from './Btn';
import History from './History';

export default function Profile({ token, username }: { token: string, username: string }) {
  const [password, setPassword] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setPasswordAlert('');

    if (password === '') {
      setPasswordAlert('provide a password');
    } else {
      const axiosChangePasswordConfig = {
        method: 'post',
        url: '/api/change-password',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          password
        }
      };

      axios(axiosChangePasswordConfig)
        .then((result) => {
          setPassword('');

          setPasswordAlert(result.data.message);
        })
        .catch((error) => {
          setPasswordAlert(error.response.data.message);
        });
    };
  };

  return (
    <div className='mx-auto my-4 md:w-3/4 p-6 rounded-lg bg-white text-[#363538] shadow-lg'>
      <h4 className='text-center font-bold text-[#408697] uppercase'>{username} - profile</h4>
      <div className='grid grid-cols-2'>
        <div className='flex justify-center'>
          <div>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className='grid grid-cols-12 form-group mt-6'>
                <div className='col-span-11'>
                  <label className='form-label inline-block mb-2 ml-2 text-xs font-semibold text-[#363538]'>change password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-[#363538] bg-[#f6f6f6] bg-clip-padding border-2 border-solid border-transparent rounded transition ease-in-out m-0 focus:ring-0 focus:border-[#408697] focus:outline-none'
                    placeholder='ender password'
                  />
                </div>
                <button
                    type='button'
                    className='mt-8 ml-2 text-[#363538]'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlash className='w-[22px] hover:text-[#408697]'/> : <Eye className='w-5 hover:text-[#408697]'/>}
                </button>
              </div>
              <div className='grid grid-cols-12'>
                {(passwordAlert != '' ? <div className='col-start-2 col-span-10 text-xs ml-2 text-red-800'>{passwordAlert}</div> : '')}
              </div>

              <div className='text-center mt-6'>
                <Btn onclick={(event) => handleSubmit(event)} label='change' icon={undefined} />
              </div>
            </form>


            <div className='mt-10 text-xs'>
              <h6 className='font-semibold'>Correct password:</h6>
              <ul>
                <li>should contain 8 - 100 characters</li>
                <li>should contain uppercase and lowercase letters</li>
                <li>should contain at least 1 digit</li>
                <li>should not contain spaces</li>
              </ul>
            </div>
          </div>

        </div>
        <div>
          <History token={token} />
        </div>
      </div>
    </div>
  );
};
