import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import '../CSS/modal.css'


const TrainerPopup = (data) => {
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

            <div className="col-sm" >
            <FloatingLabel
                controlId="floatingInput"
                label="اسم"
                className="mb-3"
             
              >
                <Form.Control type="text" placeholder="Description" value={data.data.NameAr} readOnly/>
              </FloatingLabel>
             
            </div>
          </div>


     
          
          <div className="row mainrow">
            <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="Title English"
                className="mb-3"
             
              
              >
                <Form.Control type="text" placeholder="Description" value={data.data.TitleEn} readOnly/>
              </FloatingLabel>
            
              <span className="spanForm"> |</span>
            </div>

            <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="عنوان"
                className="mb-3"
               
              
              >
                <Form.Control type="text" placeholder="Description" value={data.data.TitleAr} readOnly/>
              </FloatingLabel>
              
            </div>
          </div>

          <div className="row mainrow">
            <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="Remarks"
                className="mb-3"
              
              
              >
                <Form.Control type="text" placeholder="Description" value={data.data.Remarks} readOnly/>
              </FloatingLabel>
            
            </div>

          
          </div>

          <div className="row mainrow">
            <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="Short Name"
                className="mb-3"
              
              >
                <Form.Control type="text" placeholder="Description" value={data.data.ShortNameEn} readOnly  />
              </FloatingLabel>
            
              <span className="spanForm"> |</span>
            </div>

            <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="اسم"
                className="mb-3"
             
              
              >
                <Form.Control type="text" placeholder="Description" value={data.data.ShortNameAr=== undefined ? <>N/A</> :  data.data.ShortNameAr} readOnly />
              </FloatingLabel>
              
            </div>
          </div>
          <div className="row mainrow">
            <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="Detail"
                className="mb-3"
              
              >
                <Form.Control type="text" placeholder="Description" value={data.data.Detail} readOnly/>
              </FloatingLabel>
           
     
            </div>

           
          </div>

          <div className="ButtonSection">
          <div>
      
          <img src={data.data.image} className="PreviewImage" alt=""/>

          </div>
           
          </div>
          
       
      </div>
  
  
  )
}

export default TrainerPopup;