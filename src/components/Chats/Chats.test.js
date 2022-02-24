import { render, screen } from '@testing-library/react';
import { Chats } from './Chats';

describe('Chats', () => {
   it('Компонент существует', () => {
      expect(Chats).toBeInstanceOf(Function);
   });

   it('Изначально список чатов существует, но пустой', () => {
      const message = [];
      render(<Chats message={message} />);

      expect(screen.getByRole('list')).toBeTruthy();
      expect(screen.queryByRole('listitem')).toBeFalsy();
   });

   it('Сформированный список сообщений', () => {
      const message = [{
         id: 1,
         author: 'somebody',
         text: 'some text',
      },
      {
         id: 2,
         author: 'another',
         text: 'some text',
      },
      {
         id: 3,
         author: 'somebody',
         text: 'some text',
      }];
      render(<Chats message={message} />);

      expect(screen.getAllByRole('listitem')).toHaveLength(2);
      expect(screen.getAllByText(/somebody/)).toHaveLength(1);
      expect(screen.getAllByText(/another/)).toHaveLength(1);
   });
});