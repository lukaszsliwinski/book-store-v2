import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { setup } from '../utils/testUtils';

const user = userEvent.setup();

describe('Routing', () => {
  test('Header links', async () => {
    setup('/');
    await user.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /register/i }));
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  });

  test('Redirect login to register', async () => {
    setup('/login');
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /register/i }));
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  });

  test('Redirect register to login', async () => {
    setup('/register');
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  test('Redirect profile to login when unauthorized', () => {
    setup('/profile');
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  test('Redirect cart to login when unauthorized', () => {
    setup('/profile');
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });
});
