import axios from 'axios';

export const getData = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  try {
    const response = await axios.get('http://localhost:3000/api/data', {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.response.data });
  }
};
