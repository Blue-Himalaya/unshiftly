import React, { useState, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import fetchView from '../redux-state/actions/fetchView.js';
import logOut from '../redux-state/actions/logOut.js';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const toggleDisplay = (display) => {
  if (display)
    document.getElementById("header-dropdown-list").style.display = "block";
  else
    document.getElementById("header-dropdown-list").style.display = "none";
}

const Header = (props) => {
  const isAuthenticated = useSelector(state => state.viewReducer.isAuthenticated);
  const admin = useSelector(state => state.viewReducer.admin);
  const user = useSelector(state => state.viewReducer.user);
  const dispatch = useDispatch();
  const [display, toggle] = useState(true)
  const [width, height] = useWindowSize();

  if (!isAuthenticated) {
    return (
      <>
      <div className='header'>
        UNSHIFTLY
      </div>
      <div className='header-buffer'>&nbsp;</div>
      </>
    );
  }

  if (!admin) {
    return (
      <>
      <div className='header'>
        UNSHIFTLY {props.admin}
        {/* <button className='header-button' onClick={() => {dispatch(logOut())}}>Log Out</button>
        {' '}
        <span className='header-name-large'>{user[1]}</span> */}

        <div className='header-dropdown'>
          <div className='header-dropdown-name'
          onClick={() => {
            toggleDisplay(display)
            toggle(!display)
          }}>
            <div className='header-name-large'>{width < props.mobileWidth && user[1] ? user[1].substring(0, 3): user[1]} ▾</div>
          </div>

          <div id='header-dropdown-list'>

            <div className='header-dropdown-button'>
              <button className='header-button' onClick={() => {
                dispatch(logOut())
                toggleDisplay(display)
                toggle(!display)
              }}>Log Out</button>
            </div>

          </div>
        </div>
      </div>
      <div className='header-buffer'>&nbsp;</div>
      </>
    )
  } else {
    return (
      <>
      <div className='header'>
        UNSHIFTLY

        <div className='header-dropdown'>
          <div className='header-dropdown-name'
          onClick={() => {
            toggleDisplay(display)
            toggle(!display)
          }}>
            <div className='header-name-large'>{width < props.mobileWidth && user[1] ? user[1].substring(0, 3): user[1]} ▾</div>
          </div>

          <div id='header-dropdown-list'>
            <div className='header-dropdown-button'>
              <button className='header-button' onClick={() => {
                dispatch(fetchView('schedule'))
                toggleDisplay(display)
                toggle(!display)
              }}>Edit Schedule</button>
            </div>

            <div className='header-dropdown-button'>
              <button className='header-button' onClick={() => {
                dispatch(fetchView('employees'))
                toggleDisplay(display)
                toggle(!display)
              }}>Edit Employees</button>
            </div>

            <div className='header-dropdown-button'>
            <button className='header-button' onClick={() => {
              dispatch(fetchView('calendar'))
              toggleDisplay(display)
              toggle(!display)
            }}>Go to Calendar</button>
            </div>

            <div className='header-dropdown-button'>
              <button className='header-button' onClick={() => {
                dispatch(logOut())
                toggleDisplay(display)
                toggle(!display)
              }}>Log Out</button>
            </div>

          </div>
        </div>


      </div>
      <div className='header-buffer'>&nbsp;</div>
      </>
    )
  }

}

export default Header