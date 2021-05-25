import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

const Schedule = (props) => {
  const [table, updateTable] = useState({})
  const schedule = useSelector(state => state.scheduleReducer.schedule);
  const employees = useSelector(state => state.employeeReducer.employees);
  const timeOff = useSelector(state => state.timeOffReducer.timeOff);
  const roles = useSelector(state => state.rolesReducer.roles);
  useEffect(() => {
    if (schedule && employees && timeOff && roles) {
      console.log('SCHEDULE:', schedule)
      console.log('TIMEOFF:', timeOff)
      console.log('EMPLOYEES:', employees)
      console.log('ROLES:', roles)
    }
  })

  return (
    <div>Schedule</div>
  )
}

export default Schedule