const axios = require('axios');

const logOut = () => {
  return (dispatch) => {
    axios.get('/logOut')
      .then((res) => {
        if (res.data === 'loggedOut')
        dispatch({
          type: 'LOGGED_OUT',
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

module.exports = logOut;