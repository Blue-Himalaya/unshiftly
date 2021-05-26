const axios = require('axios');
export const fetchSchedule = (startDate, endDate) => {
  return (dispatch) => {
    axios.get('/schedule', {
      params: {
        startDate,
        endDate
      }
    })
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