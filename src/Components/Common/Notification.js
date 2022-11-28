import React from 'react'
import {BsBell} from 'react-icons/bs'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';


const Notification = () => {
  return (
    <div>
      
     <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <Button
          variant="light"
          {...triggerHandler}
          className="d-inline-flex align-items-center"
        >
          
          <span className="ms-1">
          <BsBell style={{
        width: '25px',
        height: '25px'
      }}/>
          </span>
        </Button>
      )}
    </OverlayTrigger>
    </div>
  )
}

export default Notification
