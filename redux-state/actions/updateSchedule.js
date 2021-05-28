const axios = require('axios');
export const updateSchedule = (shiftId) => {
  return (dispatch) => {
    axios.put('/releaseShift', {
      shiftId: shiftId,
    })
      .then((res) => {
        dispatch({
          type: 'UPDATE_SCHEDULE',
          payload: [res.data, date, startDate, endDate, dates, datesFull],
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}