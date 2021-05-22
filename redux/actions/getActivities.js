import store from '../store.js';

const getActivityAction = () => {
  axios.get('/activityEndpoint') // idk whatever its called
    .then((res) => {
      store.dispatch({ type: 'GET_ACTIVITES', payload: res.data });
    })
    .catch((err) => {
      console.log(err)
    })
};

export default getActivityAction;