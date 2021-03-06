const axios = require('axios');
export const fetchWeek = (weekDate, offset) => { //offset is +7 or -7

  const days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
  const daysOrdered = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  var newWeekdate = new Date(weekDate)
  newWeekdate.setDate(newWeekdate.getDate() + offset);

  var startDate = new Date(weekDate)
  var endDate = new Date(weekDate)
  // DATE TO GET LIST OF DAYS IN THE WEEK
  var startDate2 = new Date(weekDate)

  //GET POSITION OF DAY FROM SCHEDULE WEEK FRI-THU
  var index = days.indexOf(daysOrdered[startDate.getDay()])

  startDate.setDate(startDate.getDate() - index + offset);
  endDate.setDate(endDate.getDate() + 7 - index + offset)
  startDate2.setDate(startDate2.getDate() - index + offset);

  //GET LIST OF DAYS IN THE WEEK
  var dates = []
  var datesFull =[]
  for (var i = 0; i < 7; i++) {
    dates.push(startDate2.getDate())
    var year = startDate2.getFullYear().toString()
    var month = (startDate2.getMonth() + 1).toString()
    var day = startDate2.getDate().toString()

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
          type: 'GET_WEEK',
          payload: [res.data, newWeekdate.toISOString(), startDate, endDate, dates, datesFull],
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export default fetchWeek;