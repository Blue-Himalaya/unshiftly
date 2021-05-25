export const fetchAdmin = (admin) => {
  return (dispatch) => {
      dispatch({
        type: 'GET_ADMIN',
        payload: admin,
      });
  };
};

export default fetchAdmin;