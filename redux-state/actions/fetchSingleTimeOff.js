const axios = require('axios');
export const fetchSingleTimeOff = (date, offset = 0) => {

  console.log(date)

  const days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
  const daysOrdered = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  var startDate = new Date(date)
  var endDate = new Date(date)

  //GET POSITION OF DAY FROM SCHEDULE WEEK FRI-THU
  var index = days.indexOf(daysOrdered[startDate.getUTCDay()])

  startDate.setDate(startDate.getDate() - index + offset);
  endDate.setDate(endDate.getDate() + 7 - index - 1 + offset)

  return (dispatch) => {
    axios.get('/allSingleTimeOff', {
      params: {
        startDate,
        endDate
      }
    })
      .then((res) => {
        dispatch({
          type: 'GET_SINGLE_TIMEOFF',
          payload: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  }
};

export default fetchSingleTimeOff;