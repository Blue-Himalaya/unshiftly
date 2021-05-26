const axios = require('axios');
export const fetchActivityList = () => {
  return (dispatch) => {
    axios.get('/getActivities')
      .then((res) => {
        console.log(res)
        dispatch({
          type: 'GET_ACTIVITIES',
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default fetchActivityList;