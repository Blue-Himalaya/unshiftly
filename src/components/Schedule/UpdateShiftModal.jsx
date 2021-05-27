import React from 'react'

const UpdateShiftModal = (props) => {

  if (props.show) {
    return (
      <div className='update-shift-modal-outside modal-outer'>
        <div className='update-shift-modal modal-inner'>
          <div onClick={() => {
            props.toggleShiftShow(!props.show)
            props.updateEmployee('')
            props.updateDay('')
            props.updateMeridian('')
            }}>x</div>
          HELLO {props.currentDay} {props.currentMeridian} {JSON.stringify(props.currentEmployee)} <br/>
          {props.publish ? 'save' : 'publish'}
        </div>
      </div>
    )
  } else {
    return (null)
  }

}

export default UpdateShiftModal