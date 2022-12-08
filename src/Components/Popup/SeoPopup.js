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
                      label="Keyword"
                      className="mb-3"
                
                    
                    >
                      <Form.Control type="text" placeholder="Name" readOnly value={data.data.KeywordEn}/>
                    </FloatingLabel>
                  
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="الكلمة الرئيسية                      "
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl", left: "initial", right: 0 }}
                
                    >
                      <Form.Control type="text" placeholder="اسم"readOnly value={data.data.KeywordAr}   style={{ left: "%" }}  />
                    </FloatingLabel>
                    
                  </div>
                </div> 

                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Title"
                      className="mb-3"
                     
                    >
                      <Form.Control type="text" placeholder="Description" readOnly value={data.data.TitleEn}/>
                    </FloatingLabel>
                  
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="عنوان"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl", left: "initial", right: 0 }}
                     
                      
                    >
                      <Form.Control type="text" placeholder="وصف"  readOnly value={data.data.TitleAr}  style={{ left: "%" }}/>
                    </FloatingLabel>
                    
                  </div>
                </div> 
          
            
            </div>
   
  )
}

export default BreederPopup