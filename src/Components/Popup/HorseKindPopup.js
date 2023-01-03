import React,{Fragment} from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const HorseKindPopup = (data) => {
  console.log(data)
  return (

            <Fragment>        
                 <div className="form">
       
                <div className="row mainrow">
                  <div className="col-sm">

                  <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      className="mb-3"
                    
                    
                   
                    >
                      <Form.Control type="text" placeholder="Description" readOnly value={data.data.NameEn}/>
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
                      <Form.Control type="text" placeholder="اسم" readOnly value={data.data.NameAr}     style={{ left: "%" }}/>
                    </FloatingLabel>
                    
                  </div>
                </div>
       
                

               
           
            </div>
     
     <div className="form">
       
     <div className="row mainrow">
                  <div className="col-sm">

                  <FloatingLabel
                      controlId="floatingInput"
                      label="Abbreviation"
                      className="mb-3"
                    
                    
                   
                    >
                      <Form.Control type="text" placeholder="Description" readOnly value={data.data.AbbrevEn}/>
                    </FloatingLabel>
                 
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="اختصار"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl", left: "initial", right: 0 }}
                    >
                      <Form.Control type="text" placeholder="اختصار" readOnly value={data.data.AbbrevAr}     style={{ left: "%" }}/>
                    </FloatingLabel>
                    
                  </div>
                </div>

     

    

 </div>
 </Fragment>

  )
}

export default HorseKindPopup