import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FormatDate from '../FormatDate';

describe('<FormatDate />', () => {
  it('Display date in 24-hour, US-locale format', () => {
    let date = new Date();
    const timeformat = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: false,
    };

    render(<FormatDate date={date} />);

    expect(
      screen.getByText(`${date.toLocaleDateString('en-US', timeformat)}`)
    ).toBeVisible();
  });

  it('Render with date = NaN', () => {
    const date = NaN;
    let correctDate = new Date();
    const timeformat = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: false,
    };

    render(<FormatDate date={date} />);

    expect(
      screen.queryByText(
        `${correctDate.toLocaleDateString('en-US', timeformat)}`
      )
    ).not.toBeInTheDocument();
  });
});
