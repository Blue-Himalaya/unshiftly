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
        schedule: action.payload,
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