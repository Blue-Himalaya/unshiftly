const axios = require('axios');

export const fetchSingleTimeOff = (date, morning, empId, empName) => {
  return (dispatch) => {
    axios.post('/requestSingleDayOff', { date, morning, empId, empName })
    .then((res) => {
      dispatch({
        type: 'REQ_TIMEOFF',
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

export default fetchSingleTimeOff;
