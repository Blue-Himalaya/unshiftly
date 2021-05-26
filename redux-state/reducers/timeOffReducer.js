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
    case 'REQ_TIMEOFF': {
      return {
        ...state,
        reqTimeOff: action.payload,
      }
    }
    default:
      return state
  }
};

export default timeOffReducer