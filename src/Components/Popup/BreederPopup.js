import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const BreederPopup = (data) => {
    console.log(data, "dtaaa")
  return (
    <div className="form">
            
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      className="mb-3"
                
                    
                    >
                      <Form.Control type="text" placeholder="Name" readOnly value={data.data.NameEn}/>
                    </FloatingLabel>
                  
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="اسم"
                      className="mb-3"
                
                    >
                      <Form.Control type="text" placeholder="اسم"readOnly value={data.data.NameAr} />
                    </FloatingLabel>
                    
                  </div>
                </div> 

                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Description"
                      className="mb-3"
                     
                    >
                      <Form.Control type="text" placeholder="Description" readOnly value={data.data.DescriptionEn}/>
                    </FloatingLabel>
                  
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="وصف"
                      className="mb-3"
                     
                      
                    >
                      <Form.Control type="text" placeholder="وصف"  readOnly value={data.data.DescriptionAr}/>
                    </FloatingLabel>
                    
                  </div>
                </div> 

               

                <div className="ButtonSection">
                <div>
               
                <img src={data.data.image}  className="PreviewImage" alt=""/>

                </div>
               
                </div>
            
            </div>
   
  )
}

export default BreederPopup