import { TOGGLE_PROFILE, INPUT_NAME, CHANGE_NAME } from './actions';
import { profileReducer } from './reducer';

describe('profileReducer', () => {
   it('Reducer существует', () => {
      expect(profileReducer).toBeInstanceOf(Function);
   });

   it('При старте Reducer возвращает значение по умолчанию', () => {
      expect(profileReducer(undefined, {})).toEqual({
         visible: false,
         input: '',
         name: 'user'
      });
   });

   it('При Action = TOGGLE_PROFILE', () => {
      expect(profileReducer(undefined, { type: TOGGLE_PROFILE })).toEqual({
         visible: true,
         input: '',
         name: 'user'
      });
   });

   it('При Action = INPUT_NAME', () => {
      expect(profileReducer(undefined, { type: INPUT_NAME, value: 'Петя' })).toEqual({
         visible: false,
         input: 'Петя',
         name: 'user'
      });
   });

   it('При Action = CHANGE_NAME', () => {
      expect(profileReducer({ visible: true, input: 'Петя', name: 'user' },
         { type: CHANGE_NAME })).toEqual({
            visible: false,
            input: '',
            name: 'Петя'
         });
   });
});