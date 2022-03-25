export const TOGGLE_LOGIN = 'PROFILE::TOGGLE_LOGIN';
export const INPUT_NAME = 'PROFILE::INPUT_NAME';
export const CHANGE_NAME = 'PROFILE::CHANGE_NAME';

export const toggleLogin = (status) => ({
  type: TOGGLE_LOGIN,
  status
});

export const changeName = (auth) => ({
  type: CHANGE_NAME,
  auth
});
