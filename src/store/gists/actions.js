import { GLOBAL } from '../../GlobalData';

export const GET_GISTS = 'GISTS::GET_GISTS';
export const TOGGLE_LOAD = 'GISTS::TOGGLE_LOAD';
export const TOGGLE_ERROR = 'GISTS::TOGGLE_ERROR';

export const getGists = (payload) => ({
  type: GET_GISTS,
  payload
});

export const toggleLoad = {
  type: TOGGLE_LOAD
};

export const toggleError = {
  type: TOGGLE_ERROR
};

export const getGistsThunk = () => async (dispatch) => {
  dispatch(getGists([]));
  dispatch(toggleLoad);

  try {
    const res = await fetch(GLOBAL.api);
    const gists = await res.json();
    dispatch(getGists(gists));
  } catch (err) {
    dispatch(toggleError);
  } finally {
    dispatch(toggleLoad);
  }
};
