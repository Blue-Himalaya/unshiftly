const initialState = [
  {
    activity: '',
    employee: '',
    dateTime: '',
    activityId: '',
    shift: {
      role: '',
      time: '',
      id: shift_id,
    }
  }
]
const activityListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ACTIVITY': {
      return [
      ...state, action.payload
      ]
    }
    default:
      return state
  }
};

export default activityListReducer;