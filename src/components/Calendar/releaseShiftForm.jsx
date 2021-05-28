import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const ReleaseShiftForm = (props) => {
  const { isOpen } = props;
  const { closeModal } = props;
  const [pickDate, setPickDate] = useState(null);

  return (
    <div>
      {isOpen
        ? <div className="emp-info-modal-bg-2 modal-outer">
        <div className="emp-info-modal-2 modal-inner">
        <div className="x-btn-rto-form" onClick={closeModal}>X</div>
          Release Shift
          Date: <input className="date-picker" type="date" onChange={(e) => setPickDate(e.target.value)}></input>
          <br/>
          <button type="submit" onClick={() => console.log('shift released')}>Submit request</button>
        </div>
      </div>
      : null}
    </div>
  )
}

export default ReleaseShiftForm;
