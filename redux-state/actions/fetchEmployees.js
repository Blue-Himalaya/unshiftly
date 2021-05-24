export const fetchEmployees = () => {
  return (dispatch) => {
    dispatch({
      type: 'GET_EMPLOYEES',
    });
  }
};

export default fetchEmployees;