import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Moment from "react-moment";

const CompetitionPopup = (data) => {
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
          <Form.Control type="text" placeholder="Description" readOnly value={data.data.NameEn}/>
        </FloatingLabel>
     
        <span className="spanForm"> |</span>
      </div>

      <div className="col-sm">
      <FloatingLabel
          controlId="floatingInput"
          label="اسم"
          style={{ direction: "rtl", left: "initial", right: 0 }}
          className="mb-3 floatingInputAr"
        
        >
          <Form.Control type="text" placeholder="اسم" readOnly value={data.data.NameAr}     style={{ left: "%" }}/>
        </FloatingLabel>
        
      </div>
    </div>

    {/* <div className="row mainrow">
      <div className="col-sm">

      <FloatingLabel
          controlId="floatingInput"
          label="Start Date"
          className="mb-3"
        
        
       
        >
          <Form.Control type="text" placeholder="Description" readOnly  value={
            <Moment format="YYYY/MM/DD">
            {data.data.StartDate}
          </Moment>
          }/>
        </FloatingLabel>
     
        <span className="spanForm"> |</span>
      </div>

      <div className="col-sm">
      <FloatingLabel
          controlId="floatingInput"
          label="وصف"
          style={{ direction: "rtl", left: "initial", right: 0 }}
          className="mb-3 floatingInputAr"
        
        >
          <Form.Control type="text" placeholder="اسم" readOnly value={data.data.DescAr}     style={{ left: "%" }}/>
        </FloatingLabel>
        
      </div>
    </div> */}
    <div className="row mainrow">
      <div className="col-sm">

      <FloatingLabel
          controlId="floatingInput"
          label="Competition Code"
          className="mb-3"
        
        
       
        >
          <Form.Control type="text" placeholder="Description" readOnly value={data.data.CompetitionCode}/>
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

    {/* <div className="row mainrow">
      <div className="col-sm">

      <FloatingLabel
          controlId="floatingInput"
          label="Count"
          className="mb-3"
        
        
       
        >
          <Form.Control type="text" placeholder="Description" readOnly value={data.data.CategoryCount}/>
        </FloatingLabel>
     
      </div>

      
    </div> */}
   
    <div className="row mainrow">
      <div className="col-sm">

      <FloatingLabel
          controlId="floatingInput"
          label="Count"
          className="mb-3"
        
        
       
        >
          <Form.Control type="text" placeholder="Description" readOnly value={data.data.CategoryCount}/>
        </FloatingLabel>
     
      </div>

      
    </div>

    {/* <div className="row mainrow">
      <div className="col-sm">

      <FloatingLabel
          controlId="floatingInput"
          label="Competition Category"
          className="mb-3"
        
        
       
        >
          <Form.Control type="text" placeholder="Description" readOnly value={data.data.CompetitionCategoryData.NameEn}/>
        </FloatingLabel>
     
      </div>

      
    </div> */}
</div>
  )
}

export default CompetitionPopup