import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setup } from '../utils/testUtils';

describe('Rendering', () => {
  test('Render home page', async () => {
    setup('/');

    // check if logo and search buttom are in the document
    expect(await screen.findByText(/book store/)).toBeInTheDocument();
    expect(await screen.findAllByText(/search/)).toHaveLength(2);
  });
});
