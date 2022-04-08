import { onValue, set } from 'firebase/database';
import { userRef } from '../../services/firebase';

export const TOGGLE_VISIBLE = 'PROFILE::TOGGLE_VISIBLE';
export const TOGGLE_AUTH = 'PROFILE::TOGGLE_AUTH';
export const CHANGE_LOGIN = 'PROFILE::CHANGE_LOGIN';
export const CHANGE_NAME = 'PROFILE::CHANGE_NAME';

export const toggleVisible = {
  type: TOGGLE_VISIBLE
};

export const toggleAuth = (status) => ({
  type: TOGGLE_AUTH,
  status
});

export const changeLogin = (email) => ({
  type: CHANGE_LOGIN,
  email
});

export const changeName = (name) => ({
  type: CHANGE_NAME,
  name
});

export const changeNameThunk = (name) => (dispatch) => {
  dispatch(toggleVisible);
  set(userRef, {
    name
  });
  onValue(userRef, (snapshot) => {
    const user = snapshot.val();
    dispatch(changeName(user.name));
  });
};

export const initProfileDataThunk = () => (dispatch) => {
  onValue(userRef, (snapshot) => {
    const user = snapshot.val();
    dispatch(changeName(user.name));
  });
};
