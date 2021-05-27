import React from 'react'

const Shift = (props) => {

  var color = 'white'
  if (!props.color1.includes('a')) {
    var colorVal = props.color1.split(', ')[2]
    colorVal = colorVal.replace('%)', '')
    if (parseInt(colorVal) > 55) {
      color = 'black'
    }
  }

  var noShift = (props.color1 === 'hsla(30, 0%, 100%, 0)' && !props.past && !props.timeoff[props.meridian]) ? 'no-shift' : ''
  return (
    <div className={`table-elem shift noselect ${noShift} ${props.past}`}
    style={{
      backgroundImage: `linear-gradient(0.375turn, ${props.color1} 50%, ${props.color2} 50%)`,
      color: color,
      borderRadius: '5px'
    }}
    onClick={() => {
        if (noShift && !props.past) {
          props.toggleShiftShow(!props.shiftShow)
          props.updateDate(props.dayFull)
          props.updateDay(props.day)
          props.updateMeridian(props.meridian)
          props.updateEmployee(props.employeeInfo)
        }
      }}>
    &nbsp;{props.shiftTime}&nbsp;
  </div>
  )
}

export default Shift