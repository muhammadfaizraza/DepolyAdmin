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
            className="mb-3 floatingInputAr"
            style={{ direction: "rtl", left: "initial", right: 0 }}
          
           
          >
            <Form.Control type="text" placeholder="اسم" value={data.data.NameAr}  style={{ left: "%" }} readOnly />
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
      <div className="row mainrow">
      <div className="col-sm">

      <FloatingLabel
          controlId="floatingInput"
          label="Symbol"
          className="mb-3"
        
        
       
        >
          <Form.Control type="text" placeholder="Symbol" readOnly value={data.data.Symbol}/>
        </FloatingLabel>
     
      </div>

    </div>
      <div className="row mainrow">
      <div className="col-sm">

      <FloatingLabel
          controlId="floatingInput"
          label="Short Code"
          className="mb-3"
        
        
       
        >
          <Form.Control type="text" placeholder="Description" readOnly value={data.data.shortCode}/>
        </FloatingLabel>
     
      </div>

    </div>

     

  </div>
  )
}

export default CurrencyPopup