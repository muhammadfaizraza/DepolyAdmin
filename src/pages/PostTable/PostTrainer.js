import React, { useState, Fragment, useEffect } from "react";
import "../../Components/CSS/forms.css";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import Select from "react-select";
import { fetchnationality } from "../../redux/getReducer/getNationality";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
// import { add } from "../../redux/postReducer/PostTrainer";
import swal from "sweetalert";
const TrainerForm = () => {
  // const dispatch = useDispatch();
  const history = useNavigate();
  const dispatch = useDispatch();

  const {data: nationality} = useSelector((state) => state.nationality);
  const [NameEn, setNameEn] = useState("");
  const [Detail, setDetail] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [NameAr,setNameAr] = useState("");
  const [DOB,setDOB]=useState("")
  const [TitleAr,setTitleAr] = useState("")
  const [TitleEn,setTitleEn] = useState("")
  const [Rating, setRating] = useState("");
  const [TrainerLicenseDate,setTrainerLicenseDate] = useState('');
  const [ShortNameEn,setShortNameEn] =useState("");
  const [ShortNameAr,setShortNameAr] =useState("");
  const [Age, setAge] = useState("");
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [NationalityId, setNationalityId] = useState("");



  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("NameEn", NameEn);
      formData.append("Detail",Detail);   
      formData.append("Remarks",'2')
      formData.append("NameAr", NameAr)
      formData.append("DOB", DOB);
      formData.append("Age", Age);
      formData.append("TitleAr", TitleAr);
      formData.append("Rating", Rating);
      formData.append("NationalityId", NationalityId.id);
      formData.append("TitleEn",TitleEn);
      formData.append("TrainerLicenseDate", TrainerLicenseDate);
      formData.append("ShortNameEn", ShortNameEn);
      formData.append("ShortNameAr", ShortNameAr);
    await axios.post(`http://3.90.189.40:4000/api/v1/uploadtrainer?keyword=&page=`,formData);
      
      swal({
        title: "success!",
        text: "Data Submitted !",
        icon: "success",
        button: "OK",
      });
      history("/trainer");
    } catch (error) {
    
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }
  };

  const convert = (num) => {

    if(num ){
     var date = new Date(num);
     var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
       "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
     ];
     var days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
     var delDateString = days[date.getDay()] +  " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
     return delDateString;
    }
    
   };
 
   var today = new Date();
  useEffect(() => {
    dispatch(fetchnationality());
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
  };

  let AllNationality = nationality === undefined ? <></> : nationality.map(function (item) {
    return {
      id: item._id,
      value: item.NameEn,
      label: item.NameEn,
    };
  });
  const isSubmitData =
  NameEn === ""

  return (
    <Fragment>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Add Trainer</div>
            <div className="form">
              <form onSubmit={submit}>
              <div className="row mainrow">
              <div className="col-sm">
               
                <FloatingLabel
        controlId="floatingInput"
        label="Name"
        className="mb-3"
onChange={(e) => setNameEn(e.target.value)}
                  name="Name"
                  value={NameEn}
> 
        <Form.Control type="text" placeholder="Name" />
      </FloatingLabel>
                
                
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
              <FloatingLabel
        controlId="floatingInput"
        label="اسم"
        className="mb-3 floatingInputAr"
onChange={(e) => setNameAr(e.target.value)}
                  name="Name"
                  value={NameAr}
                  style={{ direction: "rtl" }}
               
             
> 
        <Form.Control type="text" placeholder="اسم"     />
      </FloatingLabel>
              </div>
            </div>
                <div className="row mainrow">
                  <div className="col-sm">
                   <DatePicker 
                     onChange={setDOB}
                     value={DOB}
                     maxDate={today}
                     dayPlaceholder=" "
                     monthPlaceholder="Date of Birth "
                     yearPlaceholder=""
                   
                   
                   />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm"     style={{direction:"rtl"}}>
                  <input 
                       value={convert(DOB)}
                    
                     placeholder="تاريخ الولادة"
                    
                     
                   
                   
                   />
                  </div>
                </div>
                <div className="row  mainrow">
                  <div className="col-sm">
               



<FloatingLabel
        controlId="floatingInput"
        label="Title"
        className="mb-3"
        onChange={(e) => setTitleEn(e.target.value)}
     
        value={TitleEn}
> 
        <Form.Control type="text" placeholder="Title" />
      </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  

<FloatingLabel
        controlId="floatingInput"
        label="عنوان"
        className="mb-3 floatingInputAr"
onChange={(e) => setTitleAr(e.target.value)}
                  name="Name"
                  value={TitleAr}
                  style={{ direction: "rtl" }}
               
             
> 
        <Form.Control type="text" placeholder="عنوان"     />
      </FloatingLabel>

                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                 

<FloatingLabel
        controlId="floatingInput"
        label="Short Name"
        className="mb-3"
        onChange={(e) => setShortNameEn(e.target.value)}
     
        value={ShortNameEn}
> 
        <Form.Control type="text" placeholder="Short Name" />
      </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                 



<FloatingLabel
        controlId="floatingInput"
        label="اسم قصير"
        className="mb-3 floatingInputAr"
onChange={(e) => setShortNameAr(e.target.value)}
                  name="Name"
                  value={ShortNameAr}
                  style={{ direction: "rtl" }}
               
             
> 
        <Form.Control type="text" placeholder="اسم قصير"     />
      </FloatingLabel>
                  </div>
                </div>
                {/* <div className="row mainrow">
                  <div className="col-sm">
                    <input
                      placeholder=" Age"
                      onChange={(e) => setAge(e.target.value)}
                      name="Name"
                      value={Age}
                      type='number'
                      required
                    ></input>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                    onChange={(e) => setAge(e.target.value)}
                    name="Name"
                    type='number'
                    value={Age}
                    style={{ direction: "rtl" }}
                    placeholder="اسم "
                    ></input>
                  </div>
                </div> */}
                <div className="row mainrow">
                  <div className="col-sm">
                   

<FloatingLabel
        controlId="floatingInput"
        label="Details"
        className="mb-3"
        onChange={(e) => setDetail(e.target.value)}
     
        value={Detail}
> 
        <Form.Control type="text" placeholder="Details" />
      </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
             

<FloatingLabel
        controlId="floatingInput"
        label="تفاصيل"
        className="mb-3 floatingInputAr"

                  style={{ direction: "rtl" }}
               
             
> 
        <Form.Control type="text" placeholder="تفاصيل"     />
      </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                   

<FloatingLabel
        controlId="floatingInput"
        label="Remarks"
        className="mb-3"
        onChange={(e) => setRemarks(e.target.value)}
     
        value={Remarks}
> 
        <Form.Control type="text" placeholder="Details" />
      </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
        controlId="floatingInput"
        label="ملاحظات"
        className="mb-3 floatingInputAr"

                  style={{ direction: "rtl" }}
               
             
> 
        <Form.Control type="text" placeholder="ملاحظات"     />
      </FloatingLabel>
                  </div>
                </div>
                {/* <div className="row mainrow">
                  <div className="col-sm">
                    <input
                      placeholder="Rating"
                      onChange={(e) => setRating(e.target.value)}
                      name="Rating"
                      value={Rating}
                      type='number'
                      required
                    ></input>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="طول المسار"
                      type='number'
                    ></input>
                  </div>
                </div> */}
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Nationality</div>}
                      defaultValue={NationalityId}
                      onChange={setNationalityId}
                      options={AllNationality}
                      isClearable={true}
                      isSearchable={true}
                    /><span className="spanForm">
                      
                      <OverlayTrigger
          
         
          overlay={
            <Tooltip id={`tooltip-top`}>
              Add more
            </Tooltip>
          }
        >
          <button className="addmore" onClick={()=> history('/nationality')}>+</button>
        </OverlayTrigger> 
                       |</span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className='selectdir'
                      defaultValue={NationalityId}
                      onChange={setNationalityId}
                      options={AllNationality}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div> 
                <div className="row mainrow">
                  <div className="col-sm">
                  <DatePicker
                      onChange={setTrainerLicenseDate}
                      value={TrainerLicenseDate}
                      dayPlaceholder="  "
                      maxDate={today}
                      monthPlaceholder="License Date"
                      yearPlaceholder=""
                    />

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm" style={{direction:"rtl"}}>
                  <input 
                       value={convert(TrainerLicenseDate)}
                    
                     placeholder="تاريخ الولادة"
                    
                     
                   
                   
                   />
                  </div>
                </div>
                <div className="ButtonSection">
                  <div>
                    <input
                      type="file"
                      onChange={onSelectFile}
                      className="formInput"
                    />
                    {image && (
                      <img src={preview} className="PreviewImage" alt="" />
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitData}
                    className="SubmitButton"
                  >
                    Add Trainer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TrainerForm;
