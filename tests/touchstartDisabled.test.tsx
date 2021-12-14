import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Container from './TestApp';

function wrapper() {
  return render(<Container disableTouch />);
}

describe('touchstart disabled', () => {
  it('does not toggle child component off screen when dummy div is touched', async () => {
    const { getByTestId } = wrapper();

    fireEvent(
      getByTestId('clickable-button'),
      new MouseEvent('click', {
        bubbles: true,
      })
    );
    await waitFor(() => {
      expect(getByTestId('toggle-component')).toBeInTheDocument();
    });

    fireEvent(
      getByTestId('dummy'),
      new TouchEvent('touchstart', {
        bubbles: true,
      })
    );
    await waitFor(() => {
      expect(getByTestId('toggle-component')).toBeInTheDocument();
    });
  });
});
