import React from 'react';
import { useSelector } from 'react-redux';
import getFullSchedule from '../'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const schedule = useSelector(state => state.scheduleReducers.fullSchedule);
  const employees = useSelector(state => state.employeeReducers.name);



  useEffect(() => {
    // fire off action to get schedule
    getAuth();
    getFullSchedule();
    getEmployees();
    getActivities();
  }, []);

  if (isLoading) {
    return <div></div>
  }
  return (
    <>
    Hello
    </>
  )
}

export default App;