import React from 'react'
import {BsBell} from 'react-icons/bs'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const Notification = () => {
  return (
    <div>
      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}> Notification</Tooltip>}
                      >
                        <span
                          className="addmore"
                        >
                          <BsBell style={{
                            width: '25px',
                            height: '25px',
                            color:'#000'
                          }}/>
                        </span>
                  </OverlayTrigger>   
     {/* <OverlayTrigger
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
          
          </span>
        </Button>
      )}
    </OverlayTrigger> */}
    </div>
  )
}

export default Notification
