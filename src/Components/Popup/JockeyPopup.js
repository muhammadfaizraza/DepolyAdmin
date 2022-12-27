import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";



const JockeyPopup = (data) => {

    
console.log(data)


    return (
        <>
           <div className="form">
           <div className="modalPreview">
   
   <img src={data.data.image} className="PreviewImage" alt=""/>

 
    
   </div>
       
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
             className="mb-3 floatingInputAr"
             style={{ direction: "rtl", left: "initial", right: 0 }}  
          
           >
             <Form.Control type="text" placeholder="Description" value={data.data.NameAr}   style={{ left: "%" }} readOnly/>
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
             <Form.Control type="text" placeholder="Description" value={data.data.RemarksEn} readOnly/>
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
             <Form.Control type="text" placeholder="Description" value={data.data.RemarksAr} style={{ left: "%" }}  readOnly/>
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
             className="mb-3 floatingInputAr"
             style={{ direction: "rtl", left: "initial", right: 0 }} 
           
           >
             <Form.Control type="text" placeholder="Description" value={data.data.ShortNameAr=== undefined ? <>N/A</> :  data.data.ShortNameAr} readOnly     style={{ left: "%" }} />
           </FloatingLabel>
           
         </div>
       </div>
       <div className="row mainrow">
         <div className="col-sm">
         <FloatingLabel
             controlId="floatingInput"
             label="Date Of Birth  "
             className="mb-3"
           
           
           >
             <Form.Control type="text" placeholder="Description" value={data.data.DOB} readOnly/>
           </FloatingLabel>
         
         </div>

       
       </div>
       <div className="row mainrow">
         <div className="col-sm">
         <FloatingLabel
             controlId="floatingInput"
             label="Rating"
             className="mb-3"
           
           
           >
             <Form.Control type="text" placeholder="Description" value={data.data.Rating} readOnly/>
           </FloatingLabel>
         
         </div>

       
       </div>
       <div className="row mainrow">
         <div className="col-sm">
         <FloatingLabel
             controlId="floatingInput"
             label="Nationality"
             className="mb-3"
           
           >
             <Form.Control type="text" placeholder="Description" 
             value={data.data.JockeyNationalityData&& data.data.JockeyNationalityData.NameEn} 
             readOnly/>
           </FloatingLabel>
        
  
         </div>

        
       </div>
       <div className="row mainrow">
         <div className="col-sm">
         <FloatingLabel
             controlId="floatingInput"
             label="Jockey Allowance"
             className="mb-3"
           
           
           >
             <Form.Control type="text" placeholder="Description" value={data.data.JockeyAllowance} readOnly/>
           </FloatingLabel>
         
         </div>

       
       </div>
       <div className="row mainrow">
         <div className="col-sm">
         <FloatingLabel
             controlId="floatingInput"
             label=" Maximum Jockey Weight"
             className="mb-3"
           
           
           >
             <Form.Control type="text" placeholder="Description" value={data.data.MaximumJockeyWeight} readOnly/>
           </FloatingLabel>
         
         </div>

       
       </div>
       <div className="row mainrow">
         <div className="col-sm">
         <FloatingLabel
             controlId="floatingInput"
             label=" Miniumum Jockey Weight"
             className="mb-3"
           
           
           >
             <Form.Control type="text" placeholder="Description" value={data.data.MiniumumJockeyWeight} readOnly/>
           </FloatingLabel>
         
         </div>

       
       </div>   
     
      
       
    
   </div>
        </>
    );
};

export default JockeyPopup;