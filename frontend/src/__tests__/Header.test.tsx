import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { setup } from '../utils/testUtils';

const user = userEvent.setup();

describe('Routing', () => {
  test('Header links', async () => {
    setup('/');
    const loginNavLink = screen.getByRole('button', { name: /login/i });
    const registerNavLink = screen.getByRole('button', { name: /register/i });

    await user.click(loginNavLink);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    await user.click(registerNavLink);
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  });

  test('Redirect login to register', async () => {
    setup('/login');
    const registerNavLink = screen.getByRole('button', { name: /register/i });

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    await user.click(registerNavLink);
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  });

  test('Redirect register to login', async () => {
    setup('/register');
    const loginNavLink = screen.getByRole('button', { name: /login/i });

    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();

    await user.click(loginNavLink);
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
