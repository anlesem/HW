import { render } from '@testing-library/react';
import { ProfileForm } from './ProfileForm';

describe('ChatButtons', () => {
  it('Компонент существует', () => {
    expect(ProfileForm).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const { asFragment } = render(<ProfileForm />);
    expect(asFragment(<ProfileForm />)).toMatchSnapshot();
  });
});
