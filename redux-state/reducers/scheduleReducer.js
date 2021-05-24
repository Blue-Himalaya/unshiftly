// const initialState = [
//   {

//   }
// ]

const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_SCHEDULE': {
      return {
        schedule: 'schedule',
      }
    }
    default:
      return state
  }
};

export default scheduleReducer;

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