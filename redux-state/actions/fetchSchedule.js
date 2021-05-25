const axios = require('axios');
export const fetchSchedule = () => {
  return (dispatch) => {
    axios.get('/schedule')
      .then((res) => {
        dispatch({
          type: 'GET_SCHEDULE',
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default fetchSchedule;