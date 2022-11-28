import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../../redux/postReducer/PostOwner";
import axios from "axios";
import swal from "sweetalert";
import DatePicker from "react-date-picker";
import { fetchcolor } from "../../redux/getReducer/getColor";
import { fetchnationality } from "../../redux/getReducer/getNationality";
import Select from "react-select";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const OwnerForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { data: color } = useSelector((state) => state.color);
  const { data: nationality } = useSelector((state) => state.nationality);
  var today = new Date();
  let AllColor =
    color === undefined ? (
      <></>
    ) : (
      color.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );
  let AllNationality =
    nationality === undefined ? (
      <></>
    ) : (
      nationality.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );

  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState();
  const [TitleEn, setTitleEn] = useState("");
  const [TitleAr, setTitleAr] = useState("");
  const [ShortEn, setShortEn] = useState("");
  // const [SilkColor, setimage] = useState("");
  const [ShortAr, setShortAr] = useState("");
  const [NationalityID, setNationalityID] = useState("");
  const [RegistrationDate, setRegistrationDate] = useState("");
  const [Ownerimage, setOwnerimage] = useState();
  const [image, setimage] = useState([]);
  const [preview, setPreview] = useState();

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
  useEffect(() => {
    dispatch(fetchcolor());
    dispatch(fetchnationality());
  }, [dispatch]);

    const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Ownerimage", Ownerimage);
    formData.append("NameEn", NameEn);
    formData.append("NameAr", NameAr);
    formData.append("TitleEn", TitleEn);
    formData.append("TitleAr", TitleAr);
    formData.append("ShortEn", ShortEn);
    formData.append("ShortAr", ShortAr);
    formData.append("NationalityID", NationalityID.id);
    formData.append("RegistrationDate", RegistrationDate);
    formData.append("image", image);
    // image.forEach((image) => {
    // formData.append("image", image);
    // 

    // });
    try {
      await axios.post(`http://3.90.189.40:4000/api/v1/createowner`,formData);
      swal({
        title: "Success!",
        text: 'Data has been added successfully',
        icon: "success",
        button: "OK",
      });
      history("/owner");
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

  const isSubmitData = NameEn === "" || image === null || image === undefined;
  useEffect(() => {
    if (!Ownerimage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(Ownerimage);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [Ownerimage]);
    const onSelectFile = (e) => {
      setOwnerimage(e.target.files[0]);
    };
    const onSelectFile1 = (e) => {
      setimage(e.target.files[0]);
    };

    const createServiceImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setimage([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setimage((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
    
  };

  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Add Owner</div>
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
        onChange={(e) => setShortEn(e.target.value)}
     
        value={ShortEn}
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
onChange={(e) => setShortAr(e.target.value)}
                  name="Name"
                  value={ShortAr}
                  style={{ direction: "rtl" }}
               
             
> 
        <Form.Control type="text" placeholder="اسم قصير"     />
      </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <DatePicker
                      onChange={setRegistrationDate}
                      value={RegistrationDate}
                      dayPlaceholder=""
                      maxDate={today}
                      monthPlaceholder="Registration Date"
                      yearPlaceholder=""
                    />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm" style={{direction:"rtl"}}>
                    <input
   style={{direction:"rtl"}}
                     
                      placeholder="تاريخ التسجيل"
                     value={convert(RegistrationDate)}
                    />
                   
                  </div>
                </div>
                {/* <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                    
                      placeholder={<div>Select Color</div>}
                      defaultValue={SilkColor}
                      onChange={setimage}
                      options={AllColor}
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
          <button className="addmore" onClick={()=> history('/color')}>+</button>
        </OverlayTrigger> 
                      
                       |</span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد نوع الجنس</div>}
                      className='selectdir'
                      defaultValue={SilkColor}
                      onChange={setimage}
                      options={AllColor}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div> */}
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search Nationality</div>}
                      defaultValue={NationalityID}
                      onChange={setNationalityID}
                      options={AllNationality}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <button
                          className="addmore"
                          onClick={() => history("/nationality")}
                        >
                          +
                        </button>
                      </OverlayTrigger>
                      |
                    </span>
                  </div>

                  <div className="col-sm">
                    <Select
                      className="selectdir"
                      placeholder={
                        <div style={{ direction: "rtl" }}>
                          اكتب للبحث عن الجنسية
                        </div>
                      }
                      defaultValue={NationalityID}
                      onChange={setNationalityID}
                      options={AllNationality}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                {/* <div className="row mainrow">
                  <div className="col-sm">
                    <input
                      placeholder=" Rating"
                      onChange={(e) => setNameEn(e.target.value)}
                      name="Name"
                      value={NameEn}
                      required
                    ></input>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      onChange={(e) => setNameAr(e.target.value)}
                      value={NameAr}
                      placeholder="اسم "
                    ></input>
                  </div>
                </div> */}
                <label className="Multiplecaplabel">Select Multiple Caps</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={onSelectFile1}
                  multiple
                />
                <div className="ButtonSection">
                  <div>
                  <label className="Multipleownerlabel">Select Owner image</label>

                    <input
                      type="file"
                      onChange={onSelectFile}
                      className="formInput"
                    />
                    {Ownerimage && (
                      <img src={preview} alt="" className="PreviewImage" />
                    )}
                  </div>

                  <button
                    type="submit"
                    className="SubmitButton"
                    disabled={isSubmitData}
                  >
                    Add Owner
                  </button>
                </div>
                
              </form>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default OwnerForm;