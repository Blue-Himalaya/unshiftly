const initialState = {
  timeOff: [],
  reqTimeOff: [],
}
const timeOffReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_TIMEOFF': {
      return {
        ...state,
        timeOff: action.payload,
      }
    }
    case 'GET_SINGLE_TIMEOFF': {
      return {
        ...state,
        singleTimeOff: action.payload,
      }
    }
    default:
      return state
  }
};

export default timeOffReducer;