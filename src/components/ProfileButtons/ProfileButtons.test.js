import { render } from '@testing-library/react';
import { ProfileButtons } from './ProfileButtons';

describe('ChatButtons', () => {
  it('Компонент существует', () => {
    expect(ProfileButtons).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const { asFragment } = render(<ProfileButtons />);
    expect(asFragment(<ProfileButtons />)).toMatchSnapshot();
  });
});
