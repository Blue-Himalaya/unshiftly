const axios = require('axios');

const updateActivities = (id, type) => {
  return (dispatch) => {
    axios.put('/updateActivities', { id, type })
      .then((updated) => {
        console.log(updated)
        dispatch({
          type: 'UPDATE_ACTIVITIES',
          payload: {
            activities: updated.activities,
          }
        })
      })
  }
};

export default updateActivities;