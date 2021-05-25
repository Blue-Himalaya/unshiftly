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
         item.role = [item.role]
   })
   return result
 }

const employeeRolesFormatting = (input) => {
  let result = Object.values(input.reduce((a,{id,name,phone,birthday, start_date,password,is_active, ...props})=>{
    if(!a[name])
     a[name]  = Object.assign({}, {id,name,phone,birthday,start_date,password,is_active,roles : [props]});
    else
     a[name].roles.push(props);
      return a;
     }, {}));
  return result
}

 module.exports = {
  adminScheduleFormatting,
  employeeRolesFormatting
 }
