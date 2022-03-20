import { render, screen, fireEvent } from '@testing-library/react';
import { ChatButtons } from './ChatButtons';

describe('ChatButtons', () => {
  it('Компонент существует', () => {
    expect(ChatButtons).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const handleAdd = jest.fn();
    const handleDelete = jest.fn();
    const checked = [];
    const { asFragment } = render(<ChatButtons data={{ handleAdd, handleDelete, checked }} />);
    expect(asFragment(<ChatButtons />)).toMatchSnapshot();
  });

  it('Обработка клика на кнопку Добавить', () => {
    const handleAdd = jest.fn();
    const handleDelete = jest.fn();
    const checked = [];

    render(<ChatButtons data={{ handleAdd, handleDelete, checked }} />);

    const button = screen.getByTestId('chats-button-add');

    fireEvent.click(button);
    expect(handleAdd).toBeCalled();
  });

  it('Обработка клика на кнопку Удалить', () => {
    const handleAdd = jest.fn();
    const handleDelete = jest.fn();
    const checked = [0, 1];

    render(<ChatButtons data={{ handleAdd, handleDelete, checked }} />);

    const button = screen.getByTestId('chats-button-remove');

    fireEvent.click(button);
    expect(handleDelete).toBeCalled();
  });
});
