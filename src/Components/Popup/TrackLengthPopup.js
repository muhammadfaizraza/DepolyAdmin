import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const TrackLengthPopup = (data) => {
    console.log(data)
  return (
    <div className="page">
    <div className="rightsidedata">
      <div
        style={{
          marginTop: "30px",
        }}
      >
        
        <div className="form">
   
            <div className="row mainrow">
              <div className="col-sm">

              <FloatingLabel
                  controlId="floatingInput"
                  label="Track Length"
                  className="mb-3"
                
                
               
                >
                  <Form.Control type="text" placeholder="Description" readOnly value={data.data.TrackLength}/>
                </FloatingLabel>
             
               
              </div>
            </div>
   
            

            <div className="row mainrow">
              <div className="col-sm">

              <FloatingLabel
                  controlId="floatingInput"
                  label="Rail Position"
                  className="mb-3"
                
                
               
                >
                  <Form.Control type="text" placeholder="Description" readOnly value={data.data.RailPosition}/>
                </FloatingLabel>
             
             
              </div>
            </div>
   
       
            <div className="row mainrow">
              <div className="col-sm">

              <FloatingLabel
                  controlId="floatingInput"
                  label="Rail Position"
                  className="mb-3"
                
                
               
                >
                  <Form.Control type="text" placeholder="Description" readOnly value={data.data.RailPosition}/>
                </FloatingLabel>
             
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
              <FloatingLabel
                  controlId="floatingInput"
                  label="اسم"
                  className="mb-3 "
                
                >
                  <Form.Control type="text" placeholder="اسم" readOnly value={data.data.NameAr} style={{direction:"rtl"}}/>
                </FloatingLabel>
                
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TrackLengthPopup