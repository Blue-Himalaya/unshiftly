// shape of return data from db query with start and end date query params

const schedule_example_two =
[
  {
    "friday": [
      {
        date: "2021-05-25T11:00:000Z",
        employee: "emma3",
        role_one: "server",
        role_two: ""
      },
      {
        dateTime: "2021-05-25T17:00:00Z",
        employee: "emma 2",
        role_one: "bartender",
        role_two: ""
      }
    ],
    "saturday":
    [
      {

      }
    ]
 }
]

// optional query params for employees
// ?employee=employee === 'undefined' ->

const activity_example =
[
  {
    activity: "gave up shift",
    employee: "emma 3",
    dateTime: "2021-05-22T02:44:000Z",
    activityId: 1,
    shift: {
      role: "bartender",
      time: "2021-05-23T11:00:000Z"
      id: shift_id
    }
  }
]

// accept param regarding active or not

const employee_list =
[
  {
    name: "emma 3",
    phone: "5555555555",
    birthday: "1997-06-04",
    startDate: "2020-03-14",
    roles: [
      "bartender",
      "server",
      "event"
    ]
  }
]

