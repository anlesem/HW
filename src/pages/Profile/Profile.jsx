import { useEffect, useRef, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { logOut } from '../../services/firebase';

import {
  getProfileName,
  getProfileLogin,
  getProfileAuth,
  getProfileVisible
} from '../../store/profile/selectors';
import {
  changeName,
  changeNameThunk,
  initProfileDataThunk,
  toggleVisible
} from '../../store/profile/actions';

import style from './Profile.module.scss';

import { ProfileButtons } from '../../components/ProfileButtons/ProfileButtons';
import { ProfileForm } from '../../components/ProfileForm/ProfileForm';

export const Profile = () => {
  const visible = useSelector(getProfileVisible, shallowEqual);
  const auth = useSelector(getProfileAuth);
  const name = useSelector(getProfileName);
  const login = useSelector(getProfileLogin);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const focusForm = useRef(null);

  const handleClick = async () => {
    logOut();
    dispatch(changeName('user'));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changeNameThunk(input));
    setInput('');
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleCheck = () => {
    dispatch(toggleVisible);
  };

  useEffect(() => {
    dispatch(initProfileDataThunk());
  }, []);

  useEffect(() => {
    if (focusForm.current) focusForm.current.focus();
  });

  return (
    <div className={style.main}>
      <h1 className={style.head}>{name}</h1>
      <p className={style.head}>{login}</p>
      {auth ? (
        <ProfileForm
          visible={visible}
          input={input}
          setInput={setInput}
          handleClick={handleClick}
          handleSubmit={handleSubmit}
          handleKeyDown={handleKeyDown}
          handleCheck={handleCheck}
          focusForm={focusForm}
        />
      ) : (
        <ProfileButtons />
      )}
    </div>
  );
};
