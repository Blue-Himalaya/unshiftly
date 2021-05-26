import React from 'react'

const Shift = (props) => {
  return (
    <div className={'table-elem shift noselect'}
    style={{
      // background: `linear-gradient(0.375turn, ${props.color1} 50%, ${props.color2} 50%)`,
      backgroundColor: props.color1,
      color: 'white',
      borderRadius: '5px'
    }}
    onClick={() => {props.toggleShiftShow(!props.shiftShow)}}>
    &nbsp;{props.shiftTime}&nbsp;
  </div>
  )
}

export default Shift