import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { setup } from '../utils/testUtils';
import axios from 'axios';
import mockedLoginResponse from '../__mocks__/mockedLoginResponse.json';

jest.mock('axios');

const user = userEvent.setup();

describe('Login', () => {
  test('Test user login', async () => {
    setup('/login');
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValueOnce(mockedLoginResponse);

    await user.type(screen.getByPlaceholderText('enter username'), 'test-user');
    await user.type(screen.getByPlaceholderText('enter password'), 'Test-Pass334');

    await user.click(screen.getByRole('submit'));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /logout/i }));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});

// Error: Not implemented: navigation (except hash changes)
// https://github.com/jsdom/jsdom/issues/2112
