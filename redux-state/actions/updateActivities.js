const axios = require('axios');

const updateActivities = (id, name, type) => {
  console.log(id, name, type)
  return (dispatch) => {
    axios.put('/updateActivities', { id, name, type })
      .then((updated) => {
        console.log(updated)
        dispatch({
          type: 'UPDATE_ACTIVITIES',
          payload: {
            activities: updated.data,
          }
        })
      })
  }
};

export default updateActivities;