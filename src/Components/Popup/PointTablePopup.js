import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const PointTable = (data) => {
  console.log(data,' dadat')
  return (
   
        
        <div className="form">
   
            <div className="row mainrow">
              <div className="col-sm">

              <FloatingLabel
                  controlId="floatingInput"
                  label="Bonus_Point                  "
                  className="mb-3"
                
                
               
                >
                  <Form.Control type="text" placeholder="Description" readOnly value={data.data.Bonus_Point}/>
                </FloatingLabel>
             
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
              <FloatingLabel
                  controlId="floatingInput"
                  label=" Group_Name"
                  className="mb-3"
                
                >
                  <Form.Control type="text" placeholder="اسم" readOnly value={data.data.Group_Name}/>
                </FloatingLabel>
                
              </div>
            </div>
            <div className="row mainrow">
              <div className="col-sm">

              <FloatingLabel
                  controlId="floatingInput"
                  label="Point "
                  className="mb-3"
                
                
               
                >
                  <Form.Control type="text" placeholder="Description" readOnly value={data.data.Point}/>
                </FloatingLabel>
             
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
              <FloatingLabel
                  controlId="floatingInput"
                  label=" Rank"
                  className="mb-3 "
                
                >
                  <Form.Control type="text" placeholder="اسم" readOnly value={data.data.Rank} />
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

export default PointTable