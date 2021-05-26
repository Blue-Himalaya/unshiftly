const axios = require('axios');
export const fetchActivityList = () => {
  return (dispatch) => {
    axios.get('/getActivities')
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: 'GET_ACTIVITIES',
          payload: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

// ?startDate=2019-10-11&endDate=2019-10-18

export default fetchActivityList;