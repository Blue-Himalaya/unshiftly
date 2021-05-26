import React from 'react'

const Shift = (props) => {

  var noShift = props.color1 === 'rgba(255, 255, 255, 0)' ? 'no-shift' : ''
  return (
    <div className={`table-elem shift noselect ${noShift}`}
    style={{
      backgroundImage: `linear-gradient(0.375turn, ${props.color1} 50%, ${props.color2} 50%)`,
      color: 'white',
      borderRadius: '5px'
    }}
    onClick={() => {props.toggleShiftShow(!props.shiftShow)}}>
    &nbsp;{props.shiftTime}&nbsp;
  </div>
  )
}

export default Shift