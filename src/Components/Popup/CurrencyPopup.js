import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const CurrencyPopup = (data) => {

  return (
    <div className="form">

      <div className="row mainrow">
        <div className="col-sm">
        <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
        
          
          >
            <Form.Control type="text" placeholder="Description"  value={data.data.NameEn} readOnly/>
          </FloatingLabel>
       
          <span className="spanForm"> |</span>
        </div>

        <div className="col-sm">
        <FloatingLabel
            controlId="floatingInput"
            label="اسم"
            className="mb-3"
          
           
          >
            <Form.Control type="text" placeholder="اسم" value={data.data.NameAr} readOnly />
          </FloatingLabel>
        
        </div>
      </div>


      <div className="row mainrow">
        <div className="col-sm">
        <FloatingLabel
            controlId="floatingInput"
            label="Rate"
            className="mb-3"
           
          
          >
            <Form.Control type="number" placeholder="Rate" value={data.data.Rate} readOnly/>
          </FloatingLabel>
        
        </div>
      </div>
      

     

  </div>
  )
}

export default CurrencyPopup