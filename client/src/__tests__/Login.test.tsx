import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { setup } from '../utils/testUtils';
import axios from 'axios';
import mockedLoginResponse from '../__mocks__/mockedLoginResponse.json';

jest.mock('axios');

const user = userEvent.setup();

describe('Login', () => {
  test('Test user login and logout', async () => {
    setup('/login');

    // mock login axios response
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValueOnce(mockedLoginResponse);

    // simulate login action and check if alert is in the document
    await user.type(screen.getByPlaceholderText('enter username'), 'test-user');
    await user.type(screen.getByPlaceholderText('enter password'), 'Test-Pass334');
    await user.click(screen.getByRole('submit'));

    // check if profile link is in the document (appears after authorization)
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();

    // simulate logout action and check if alert is in the document
    await user.click(screen.getByRole('link', { name: /logout/i }));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    // check if login button is in the document (appears only for unauthorized users)
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});

// Error: Not implemented: navigation (except hash changes)
// https://github.com/jsdom/jsdom/issues/2112
