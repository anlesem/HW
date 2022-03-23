import { GLOBAL } from '../../GlobalData';

// export const GET_DATA = 'DATA::GET_DATA';
export const GET_ALL_DATA = 'DATA::GET_ALL_DATA';
export const TOGGLE_LOAD = 'DATA::TOGGLE_LOAD';
export const SET_ERROR = 'DATA::SET_ERROR';

// export const getData = (payload) => ({
//   type: GET_DATA,
//   payload
// });

export const getDataAll = (payload) => ({
  type: GET_ALL_DATA,
  payload
});

export const toggleLoad = {
  type: TOGGLE_LOAD
};

export const setError = (status) => ({
  type: SET_ERROR,
  status
});

export const getDataAllThunk = () => async (dispatch) => {
  dispatch(getDataAll([]));
  dispatch(toggleLoad);
  dispatch(setError(false));

  try {
    const res = await fetch(GLOBAL.api);
    if (res.ok) {
      const data = await res.json();
      dispatch(getDataAll(data));
    } else throw new Error('response not ok');
  } catch (err) {
    dispatch(setError(true));
  } finally {
    dispatch(toggleLoad);
  }
};
