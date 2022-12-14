import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const NationalityPopup = (data) => {
    console.log(data)
  return (
    <div className="form">

<div className='modalPreview'>
    
    <img src={data.data.image}  className="PreviewImage" alt=""/>

    </div>
      <div className="row mainrow">
        <div className="col-sm">
        <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
           
          >
            <Form.Control type="text"  placeholder="Name" value={data.data.NameEn  } readOnly/>
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
            <Form.Control type="text"  placeholder="اسم"  value={data.data.NameAr  }  style={{ left: "%" }} readOnly />
          </FloatingLabel>
       
        </div>
      </div>
 

      <div className="row mainrow">
        <div className="col-sm">
        <FloatingLabel
            controlId="floatingInput"
            label="Alternate Name"
            className="mb-3"
           
          
          >
            <Form.Control type="text"  placeholder="Alternative Name"  value={data.data.AltNameEn} readOnly />
          </FloatingLabel>
        
        </div>

      </div>

      <div className="row mainrow">
        <div className="col-sm">
        <FloatingLabel
            controlId="floatingInput"
            label="Abbrevation"
            className="mb-3"
          
          
          >
            <Form.Control type="text"  placeholder="Abbrevation"  value={data.data.AbbrevEn} readOnly />
          </FloatingLabel>
        
        </div>

      </div>
      <div className="row mainrow">
        <div className="col-sm">
        <FloatingLabel
            controlId="floatingInput"
            label="Hemisphere"
            className="mb-3"
           
          >
            <Form.Control type="text"  placeholder="Name" value={data.data.HemisphereEn  } readOnly/>
          </FloatingLabel>
       
        
          <span className="spanForm"> |</span>
        </div>

        <div className="col-sm">
        <FloatingLabel
            controlId="floatingInput"
            label="نصف الكرة الأرضية"
            className="mb-3 floatingInputAr"
            style={{ direction: "rtl", left: "initial", right: 0 }}

           
          >
            <Form.Control type="text"  placeholder="نصف الكرة الأرضية"  value={data.data.HemisphereAr  }  style={{ left: "%" }} readOnly />
          </FloatingLabel>
       
        </div>
      </div>
 
      {/* <div className="row mainrow">
        <div className="col-sm">
        <FloatingLabel
            controlId="floatingInput"
            label="Label"
            className="mb-3"
         
          >
            <Form.Control type="text"  placeholder="Label"  value={data.data.Label} readOnly  />
          </FloatingLabel>
        
        </div>

     
      </div> */}

      {/* <div className="row mainrow">
        <div className="col-sm">
        <FloatingLabel
            controlId="floatingInput"
            label="Offset"
            className="mb-3"
          
          
          >
            <Form.Control type="number"  placeholder="Offset"  value={data.data.Offset === true ? <>'True'</>:'False'} readOnly />
          </FloatingLabel>
        
        </div>

      </div> */}

     
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

export default NationalityPopup