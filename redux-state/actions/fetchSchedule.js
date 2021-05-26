const axios = require('axios');
export const fetchSchedule = () => {
  return (dispatch) => {
    axios.get('/schedule?startDate=2019-10-11&endDate=2019-10-18')
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