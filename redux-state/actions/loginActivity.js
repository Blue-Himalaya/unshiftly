const axios = require('axios');

const userLoggedIn = (username, password) => {
  return (dispatch) => {
    dispatch({
      type: 'AUTH_REQUESTED',
    });
    axios.post('/login', { username, password })
      .then((res) => {
        if (res.data.auth === 'success!') {
          dispatch({
            type: 'IS_AUTHENTICATED',
            payload: res.data.role,
          });
        }
        if (res.data === 'No User Exists') {
          dispatch({
            type: 'AUTH_FAILED',
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  };
};

export default userLoggedIn;