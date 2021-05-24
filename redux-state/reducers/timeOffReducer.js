const timeOffReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_TIMEOFF': {
      return {
        timeOff: action.payload,
      }
    }
    default:
      return state
  }
};

export default timeOffReducer