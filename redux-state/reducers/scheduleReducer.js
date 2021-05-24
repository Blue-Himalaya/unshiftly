const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_SCHEDULE': {
      return {
        schedule: action.payload,
      }
    }
    default:
      return state
  }
};

export default scheduleReducer;