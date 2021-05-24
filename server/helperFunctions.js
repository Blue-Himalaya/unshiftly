const moment = require('moment');

const isoStringToDate = (s) => {
  let dateTime = moment(s).format('MMMM Do YYYY, h:mm:ss a')
  let result = moment(s).format('dddd')
  return result
};
const adminScheduleFormatting = (input) => {
   var result = [{
       Friday: [],
       Saturday: [],
       Sunday: [],
       Monday: [],
       Tuesday: [],
       Wednesday: [],
       Thursday: [],
   }]
   input.forEach((item) => {
       var day = isoStringToDate(item.datetime)
       item.datetime = moment(item.datetime).format('MMMM Do YYYY, h:mm:ss a')
         result[0][day].push(item)
   })
   return result
 }

 module.exports = {
  adminScheduleFormatting
 }
