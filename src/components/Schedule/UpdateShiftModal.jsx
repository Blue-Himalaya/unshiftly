import React from 'react'

const UpdateShiftModal = (props) => {

  if (props.show) {
    return (
      <div className='update-shift-modal'
      onClick={() => {
        props.toggleShiftShow(!props.show)
      }}>HELLO</div>
    )
  } else {
    return (null)
  }

}

export default UpdateShiftModal