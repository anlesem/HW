export const TOGGLE_PROFILE = 'PROFILE::TOGGLE_PROFILE';
export const INPUT_NAME = 'PROFILE::INPUT_NAME';
export const CHANGE_NAME = 'PROFILE::CHANGE_NAME';

export const toggleVisible = {
  type: TOGGLE_PROFILE
};

export const inputName = (text) => ({
  type: INPUT_NAME,
  value: text
});

export const changeName = {
  type: CHANGE_NAME
};
