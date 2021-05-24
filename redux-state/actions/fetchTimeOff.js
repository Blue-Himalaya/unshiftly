const fetchTimeOff = () => {
  return (dispatch) => {
    axios.get('/')
      .then(() => {
        dispatch({
          type: 'GET_TIMEOFF',
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export default fetchTimeOff;