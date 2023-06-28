import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { setup } from '../utils/testUtils';
import axios from 'axios';
import mockedSearchResponse from '../__mocks__/mockedSearchResponse.json';

jest.mock('axios');

const user = userEvent.setup();

describe('Search', () => {
  test('mock search data', async () => {
    setup('/');
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValueOnce(mockedSearchResponse);

    await user.type(screen.getByRole('input'), 'dostojewski');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(screen.getAllByText(/buy/i)).toHaveLength(40);
  });
});
