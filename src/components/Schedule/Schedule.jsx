import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import fetchSchedule from '../../../redux-state/actions/fetchSchedule.js';

const Schedule = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSchedule());
    // page load, then immediate schedule view
    //
  }, []);
}
// const schedule_example_two =
// [
//   {
//     "friday": [
//       {
//         date: "2021-05-25T11:00:000Z",
//         employee: "emma3",
//         role_one: "server",
//         role_two: ""
//       },
//       {
//         dateTime: "2021-05-25T17:00:00Z",
//         employee: "emma 2",
//         role_one: "bartender",
//         role_two: ""
//       }
//     ],
//     "saturday":
//     [
//       {

//       }
//     ]
//  }
// ]