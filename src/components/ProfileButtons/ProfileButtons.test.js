import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProfileButtons } from './ProfileButtons';

describe('ProfileButtons', () => {
  it('Компонент существует', () => {
    expect(ProfileButtons).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <ProfileButtons />
      </BrowserRouter>
    );
    expect(asFragment(<ProfileButtons />)).toMatchSnapshot();
  });
});
