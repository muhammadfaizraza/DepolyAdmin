import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";



const HorsePopup = (data) => {

    



    return (
        <>
      
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

   <div className="row mainrow">
     <div className="col-sm">

     <FloatingLabel
         controlId="floatingInput"
         label="Color"
         className="mb-3"
       
       
      
       >
         <Form.Control type="text" placeholder="Description" readOnly value={data.data.ColorIDData.NameEn}/>
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
         <Form.Control type="text" placeholder="اسم" readOnly value={data.data.ColorIDData.NameAr}     style={{ left: "%" }}/>
       </FloatingLabel>
       
     </div>
   </div>

   <div className="row mainrow">
     <div className="col-sm">

     <FloatingLabel
         controlId="floatingInput"
         label="Breeder"
         className="mb-3"
       
       
      
       >
         <Form.Control type="text" placeholder="Description" readOnly value={data.data.BreederData.NameEn}/>
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
         <Form.Control type="text" placeholder="اسم" readOnly value={data.data.BreederData.NameAr}     style={{ left: "%" }}/>
       </FloatingLabel>
       
     </div>
   </div>

   <div className="row mainrow">
     <div className="col-sm">

     <FloatingLabel
         controlId="floatingInput"
         label="Gender"
         className="mb-3"
       
       
      
       >
         <Form.Control type="text" placeholder="Description" readOnly value={data.data.SexModelData.NameEn}/>
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
         <Form.Control type="text" placeholder="اسم" readOnly value={data.data.SexModelData.NameEn}     style={{ left: "%" }}/>
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
         <Form.Control type="text" placeholder="Description" readOnly value={data.data.Remarks}/>
       </FloatingLabel>
    
      
     </div>
   </div>
   
   <div className="row mainrow">
     <div className="col-sm">

     <FloatingLabel
         controlId="floatingInput"
         label="Date Of Birth"
         className="mb-3"
       
       
      
       >
         <Form.Control type="text" placeholder="Date Of Birth" readOnly value={data.data.DOB}/>
       </FloatingLabel>
    
     </div>

   </div>

   
   <div className="row mainrow">
     <div className="col-sm">

     <FloatingLabel
         controlId="floatingInput"
         label="Purchase Price"
         className="mb-3"
       
       
      
       >
         <Form.Control type="text" placeholder="Date Of Birth" readOnly value={data.data.PurchasePrice}/>
       </FloatingLabel>
    
     </div>

   </div>


</div>
        </>
    );
};

export default HorsePopup;