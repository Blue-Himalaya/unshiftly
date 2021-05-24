export const fetchSchedule = () => {
  return (dispatch) => {
    dispatch({
      type: 'GET_SCHEDULE',
    });
  }
};

export default fetchSchedule;