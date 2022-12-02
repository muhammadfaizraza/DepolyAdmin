import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const EquipmentPopup = (data) => {
  console.log(data)
    return (
    <div className="form">

      <div className="row mainrow">
        <div className="col-sm">
        <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          
          
          >
            <Form.Control type="text" placeholder="Name"  value={data.data.NameEn} readOnly/>
          </FloatingLabel>
        
        
          <span className="spanForm"> |</span>
        </div>

        <div className="col-sm">
        <FloatingLabel
            controlId="floatingInput"
            label="اسم"
            className="mb-3"
           
         
          >
            <Form.Control type="text" placeholder="اسم"  value={data.data.NameAr} readOnly/>
          </FloatingLabel>
        
        </div>
      </div>

      

      

  </div>
  )
}

export default EquipmentPopup