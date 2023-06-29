import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { setup } from '../utils/testUtils';
import axios from 'axios';
import mockedLoginResponse from '../__mocks__/mockedSearchResponse.json';
import mockedSearchResponse from '../__mocks__/mockedSearchResponse.json';
import mockedBookDetailsResponse from '../__mocks__/mockedBookDetailsResponse.json';

jest.mock('axios');

const user = userEvent.setup();

describe('Cart', () => {
  test('simulate order process', async () => {
    setup('/');
    await user.click(screen.getByRole('button', { name: /login/i }));

    // mock login axios response
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValueOnce(mockedLoginResponse);

    // simulate login action and go to main page
    await user.type(screen.getByPlaceholderText('enter username'), 'test-user');
    await user.type(screen.getByPlaceholderText('enter password'), 'Test-Pass334');
    await user.click(screen.getByRole('submit'));
    await user.click(screen.getByText(/book store/i));

    // mock search axios response
    mockedAxios.post.mockResolvedValueOnce(mockedSearchResponse);

    // search books by author
    await user.type(screen.getByRole('input'), 'dostojewski');
    await user.click(screen.getByRole('button', { name: /search/i }));

    // mock book details axios response
    mockedAxios.post.mockResolvedValueOnce(mockedBookDetailsResponse);

    // open book details page
    await user.click(screen.getByRole('link', { name: /białe noce/i }));
    expect(screen.getByText(/lindhardt og ringhof/i)).toBeInTheDocument();

    // add book to cart and check if alert is in the document
    await user.click(screen.getByRole('button', { name: /buy/i }));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    // open cart and check if book is added
    await user.click(screen.getByRole('link', { name: /cart/i }));
    expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();
    expect(screen.getByText(/białe noce/i)).toBeInTheDocument();
  });
});
