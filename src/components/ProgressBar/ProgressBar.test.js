import { render, screen } from '@testing-library/react';

import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('Компонент существует', () => {
    expect(ProgressBar).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const { asFragment } = render(<ProgressBar />);
    expect(asFragment(<ProgressBar />)).toMatchSnapshot();
  });

  it('Состояние компонента', () => {
    render(<ProgressBar />);

    expect(screen.getByTestId('progress')).toBeTruthy();
  });
});
