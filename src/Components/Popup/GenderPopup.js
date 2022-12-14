import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";


const GenderPopup = (data) => {
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
              <Form.Control type="text" placeholder="Name" value={data.data.NameEn} readOnly/>
            </FloatingLabel>
         
            <span className="spanForm"> |</span>
          </div>

          <div className="col-sm">
          <FloatingLabel
              controlId="floatingInput"
              label="اسم"
              className="mb-3 floatingInputAr"
            
            >
              <Form.Control type="text" placeholder="اسم"   value={data.data.NameAr} readOnly style={{direction:"rtl"}}/>
            </FloatingLabel>
            
          </div>
        </div>
        <div className="row mainrow">
          <div className="col-sm">

          <FloatingLabel
              controlId="floatingInput"
              label="Abbreviation"
              className="mb-3"
           
            >
              <Form.Control type="text" placeholder="Name" value={data.data.AbbrevEn} readOnly/>
            </FloatingLabel>
         
            <span className="spanForm"> |</span>
          </div>

          <div className="col-sm">
          <FloatingLabel
              controlId="floatingInput"
              label="اختصار"
              className="mb-3 floatingInputAr"
            
            >
              <Form.Control type="text" placeholder="اسم"   value={data.data.AbbrevAr} readOnly style={{direction:"rtl"}}/>
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

export default GenderPopup