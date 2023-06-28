import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setup } from '../utils/testUtils';

describe('Rendering', () => {
  test('Render home page', async () => {
    setup('/');

    expect(await screen.findByText(/book store/)).toBeInTheDocument();
    expect(await screen.findAllByText(/search/)).toHaveLength(2);
  });
});
