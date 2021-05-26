const axios = require('axios');

const userLoggedIn = (username, password) => {
  return (dispatch) => {
    dispatch({
      type: 'AUTH_REQUESTED',
    });
    axios.post('/login', { username, password }, { withCredentials: true , url: 'http://localhost:8080' })
      .then((res) => {
        if (res.data.auth === 'success!') {
          dispatch({
            type: 'IS_AUTHENTICATED',
            payload: { role: res.data.role, user: res.data.user },
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