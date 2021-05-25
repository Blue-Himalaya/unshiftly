const axios = require('axios');

const userLoggedIn = (username, password) => {
  return (dispatch) => {
    dispatch({
      type: 'AUTH_REQUESTED',
    });
    axios.post('/login', { username, password })
      .then((res) => {
        console.log(res)
        // localStorage.setItem('token', res.data.token);
        // dispatch({
        //   type: 'IS_AUTHENTICATED',
        //   payload: {
        //     is_authenticated: true,
        //     view: 'calendar',
        //     admin: res.data.admin,
        //   }
        // })
      })
      .catch((err) => {
        dispatch({
          type: 'AUTH_FAILED',
          payload: {
            view: 'login',
          }
        })
      })
  }
}

export default userLoggedIn;