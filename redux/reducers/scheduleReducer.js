const initState = {
  schedule: []
}

const scheduleReducer = (state = initState, action) => {
  switch(action.type) {
    case 'GET_SCHEDULE':
      return {
        ...state,
        schedule: [...action.payload]
      }
    default:
      return state
  }
};

export default scheduleReducer;