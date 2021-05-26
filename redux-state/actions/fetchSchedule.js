const axios = require('axios');
export const fetchSchedule = (date) => {

  const days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
  const daysOrdered = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  var startDate = new Date(date)
  var startDate2 = new Date(date)
  var endDate = new Date(date)

  console.log(startDate.toUTCString())

  var index = days.indexOf(daysOrdered[startDate.getUTCDay()])

  startDate.setDate(startDate.getUTCDate() - index - 1);
  startDate2.setDate(startDate2.getUTCDate() - index - 1);
  endDate.setDate(endDate.getUTCDate() + 7 - index - 1)

  console.log(startDate.toUTCString())
  console.log(endDate.toUTCString())

  var dates = []

  for (var i = 0; i < 7; i++) {
      dates.push(startDate2.getUTCDate())
      startDate2.setDate(startDate2.getUTCDate());
  }

  console.log(dates)

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
          payload: [res.data, date, startDate, endDate, dates],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default fetchSchedule;