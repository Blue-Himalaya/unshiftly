import React from 'react'

const UpdateShiftModal = (props) => {

  if (props.show) {
    return (
      <div className='update-shift-modal-outside'>
        <div className='update-shift-modal'>
          HELLO
        </div>
      </div>
    )
  } else {
    return (null)
  }

}

export default UpdateShiftModal