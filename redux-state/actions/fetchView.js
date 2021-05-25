export const fetchView = (view) => {
  return (dispatch) => {
      dispatch({
        type: 'GET_VIEW',
        payload: view,
      });
  };
};

export default fetchView;