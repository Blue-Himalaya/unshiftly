const axios = require('axios');
export const fetchSchedule = (date) => {

  const days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
  const daysOrdered = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  var startDate = new Date(date)
  var endDate = new Date(date)
  // DATE TO GET LIST OF DAYS IN THE WEEK
  var startDate2 = new Date(date)

  //GET POSITION OF DAY FROM SCHEDULE WEEK FRI-THU
  var index = days.indexOf(daysOrdered[startDate.getUTCDay()])

  startDate.setDate(startDate.getUTCDate() - index - 1);
  endDate.setDate(endDate.getUTCDate() + 7 - index - 1)
  startDate2.setDate(startDate2.getUTCDate() - index - 1);

  //GET LIST OF DAYS IN THE WEEK
  var dates = []
  var datesFull =[]
  for (var i = 0; i < 7; i++) {
    dates.push(startDate2.getUTCDate())
    var year = startDate2.getUTCFullYear().toString()
    var month = (startDate2.getUTCMonth() + 1).toString()
    var day = startDate2.getUTCDate().toString()

    if (month.length === 1) {
        month = '0' + month
    }

    if (day.length === 1) {
        day = '0' + day
    }
    datesFull.push([year, month, day].join('-'))
    startDate2.setDate(startDate2.getDate() + 1);
  }

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
          payload: [res.data, date, startDate, endDate, dates, datesFull],
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export default fetchSchedule;