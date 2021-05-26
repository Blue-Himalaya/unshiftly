import React from 'react'

const Shift = (props) => {

  var noShift = (props.color1 === 'rgba(255, 255, 255, 0)' && !props.past) ? 'no-shift' : ''
  return (
    <div className={`table-elem shift noselect ${noShift} ${props.past}`}
    style={{
      backgroundImage: `linear-gradient(0.375turn, ${props.color1} 50%, ${props.color2} 50%)`,
      color: 'white',
      borderRadius: '5px'
    }}
    onClick={() => {
        if (noShift && !props.past) {
          props.toggleShiftShow(!props.shiftShow)
          props.updateDay(props.dayFull)
          props.updateMeridian(props.meridian)
          props.updateEmployee(props.employeeInfo)
        }
      }}>
    &nbsp;{props.shiftTime}&nbsp;
  </div>
  )
}

export default Shift