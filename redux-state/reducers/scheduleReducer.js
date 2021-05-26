const initialState = {
  schedule: {},
  adminNotifications: {},
  activities: {},
}

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SCHEDULE': {
      return {
        ...state,
        schedule: action.payload[0],
        currentDate: action.payload[1],
        startDate: action.payload[2],
        endDate: action.payload[3],
        listOfDays: action.payload[4],
        listOfFullDays: action.payload[5]
      }
    }
    case 'GET_ACTIVITIES': {
      return {
        ...state,
        activities: action.payload,
      }
    }
    case 'UPDATE_NOTIFICATIONS': {
      return {
        ...state,
        notifications: action.payload,
      }
    }
    case 'UPDATE_SCHEDULE': {
      return {
        schedule: action.payload.schedule,
        adminNotifications: action.payload.notifications,
        activities: action.payload.activities,
      }
    }
    default:
      return state
  }
};

export default scheduleReducer;