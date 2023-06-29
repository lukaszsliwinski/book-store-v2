import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';

// render app in testing environment
export const setup = (route: string) => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </PersistGate>
    </Provider>
  );
};
