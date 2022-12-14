import React, { Fragment, useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate , useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Select from "react-select";
import { fetchnationality } from "../../redux/getReducer/getNationality";
import { fetchcolor } from "../../redux/getReducer/getColor";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import ColorPopUp from "../PostTable/Color";
import NationalityPopUp from "../PostTable/Nationality";
import { AiOutlineReload } from 'react-icons/ai'
import { Modal } from "react-bootstrap";
import TextInputValidation from "../../utils/TextInputValidation";
import { ImCross } from 'react-icons/im';

const RaceCourseForm = () => {
  const [Error , setError] =useState("");
  const [ErrorAr , setErrorAr] =useState("");
  const [ErrorColor , setErrorColor] =useState("");
  const [ErrorAbbrev , setErrorAbbrev  ] =useState("");
  const [ErrorNationality , setErrorNationality] =useState("");
  const [ErrorAbbrevAr ,setErrorAbbrevAr] = useState("")
  const [isLoading, setisLoading] = useState(false);


  

  const dispatch = useDispatch();
  const history = useNavigate();
  const {pathname} = useLocation();

  const { data: nationality } = useSelector((state) => state.nationality);
  const { data: color } = useSelector((state) => state.color);

  let AllNationality =
  nationality === undefined ? (
    <></>
  ) : (
    nationality.map(function (item) {
      return {
        id: item._id,
        value: item.NameEn,
        label: (
          <span style={{
            display:'flex',
            justifyContent:'space-between'
          }}>
           <p>{item.NameEn}</p> 
           <p>{item.NameAr}</p> 

          </span>
        ),
      };
    })
  );
   
  let AllColor =
    color === undefined ? (
      <></>
    ) : (
      color.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: (
            <div style={{
              display:'flex',
              justifyContent:'space-between'
            }}>
             <p>{item.NameEn}</p> 
             <p>{item.NameAr}</p> 
  
            </div>
          ),
        };
      })
    );

 
 

    
  const [TrackNameEn, setTrackNameEn] = useState("");
  const [TrackNameAr, setTrackNameAr] = useState("");
  // const [shortCode, setshortCode] = useState("");
  const [AbbrevEn, setAbbrevEn] = useState("");
  const [AbbrevAr, setAbbrevAr] = useState("");
  const [NationalityId, setNationalityId] = useState("");
  const [ColorCode, setColorCode] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [SearchUrl, setSearchUrl] = useState('');
  const [SearchCode, setSearchCode] = useState('');
  const [SearchTitle, setSearchTitle] = useState('');

  const [show, setShow] = useState(false);
  const [showNationality, setShowNationality] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseNationality = () => setShowNationality(false);

  const handleShow = async () => {
    await setShow(true);
  };
  
  const handleShowNationality = async () => {
    await setShowNationality(true);
  };


  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("TrackNameEn", TrackNameEn);
      formData.append("TrackNameAr", TrackNameAr + ' ');
      formData.append("ColorCode", ColorCode.id);
      formData.append("NationalityID", NationalityId.id);
      formData.append("AbbrevEn", AbbrevEn);
      formData.append("AbbrevAr", AbbrevAr);
      
      // formData.append("shortCode", shortCode);
      const response = await axios.post(
        `${window.env.API_URL}/createcourse?keyword=&page=`,
        formData
      );
      swal({
        title: "Success!",
        text: "Data has been added Successfully",
        icon: "success",
        button: "OK",
      });
      if(pathname === '/racecourseform'){
        history("/racecourse");
      }
      setisLoading(false)
    } catch (error) {
      
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
      setisLoading(false)
    }
  };

  useEffect(() => {
    dispatch(fetchnationality({SearchTitle,SearchCode,SearchUrl}));
    dispatch(fetchcolor({SearchTitle,SearchCode,SearchUrl}));
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
  const handlePreview = () => {
    setImage()
  document.getElementById("file").value=""
  };
  
  const FetchNew = () => {
    dispatch(fetchnationality({SearchTitle,SearchCode,SearchUrl}));
    dispatch(fetchcolor({SearchTitle,SearchCode,SearchUrl}));
  };

  const data1 =  (JSON.stringify(
    TextInputValidation(
      "en",
      TrackNameEn,
      "Track Name English"
    )
  ));
  const data3 = JSON.stringify(
    TextInputValidation("en", AbbrevEn, "Race Course Abbreviation English")
  );

  const abbrev = JSON.parse(data3);
  const data4 = JSON.stringify(
    TextInputValidation("ar", AbbrevAr, "Race Course Abbreviation Arabic")
  );
  const abbrevar = JSON.parse(data4);


  const obj = JSON.parse(data1);
  console.log(obj.status,'aszxZ2dasd')
 const data2 =  (JSON.stringify(
    TextInputValidation(
      "ar",
    TrackNameAr,
      "Track Name Arabic"
    )
  ));


  const objAr = JSON.parse(data2);



  return (
    <Fragment>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">New Race Course</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Race Course Name"
                      className="mb-3"
                      onChange={(e) => setTrackNameEn(e.target.value)}
                      name="Name"
                      value={TrackNameEn}
                      onBlur={() => setError(obj)}
                    >
                      <Form.Control type="text" placeholder="Track Name" required/>
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                    <span className={Error.status ? "success" :"error"}>{Error.message}</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label=" ?????? ???????? ????????????"
                      onChange={(e) => setTrackNameAr(e.target.value)}
                      value={TrackNameAr}
                      className="mb-3 floatingInputAr "
                      style={{ direction: "rtl", left: "initial", right: 0 }}
                      onBlur={() => setErrorAr(objAr)}
                    >
                      <Form.Control
                        type="text"
                        placeholder="?????? ????????"
                        style={{ left: "%" }}
                        required
                      />
                    </FloatingLabel>
                    <span className={ErrorAr.status ? "successAr" :"errorAr"}>{ErrorAr.message}</span>

                  </div>
                </div>
                <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Abbrevation"
                    className="mb-3"
                    name="AbbrevEn"
                    onChange={(e) => setAbbrevEn(e.target.value)}
                    value={AbbrevEn}
                  >
                    <Form.Control
                      required
                      name="AbbrevEn"
                      type="text"
                      placeholder="Abbrevation"
                      onBlur={() => setErrorAbbrev(abbrev)}
                    />
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                  <span className={ErrorAbbrev.status ? "success" :"error"}>{ErrorAbbrev.message}</span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="????????????"
                    className="mb-3 floatingInputAr"
                    name="AbbrevAr"
                    style={{ direction: "rtl" }}
                    onChange={(e) => setAbbrevAr(e.target.value)}
                    value={AbbrevAr}
                  >
                    <Form.Control
                      name="AbbrevAr"
                      type="text"
                      placeholder="????????????"
                      required
                      onBlur={() => setErrorAbbrevAr(abbrevar)}
                    />
                  </FloatingLabel>
                  <span className={ErrorAbbrev.status ? "successAr" :"errorAr"}>{ErrorAbbrevAr.message}</span>
                </div>
              </div>
                

                {/* <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Short Code"
                      className="mb-3"
                      onChange={(e) => setshortCode(e.target.value)}
                      value={shortCode}
                    >
                      <Form.Control type="text" placeholder="Short Code" />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="?????? ????????"
                      className="mb-3 floatingInputAr "
                      style={{ direction: "rtl", left: "initial", right: 0 }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="?????? ????????"
                        style={{ left: "%" }}
                      />
                    </FloatingLabel>
                  </div>
                </div> */}
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Color</div>}
                      defaultValue={ColorCode}
                      value={ColorCode}
                      onChange={setColorCode}
                      options={AllColor}
                      isClearable={true}
                      isSearchable={true}
                      onBlur={() => ColorCode === "" ?  setErrorColor("Color is required "):setErrorColor("Color is Validated")}
                  
                    />
                    <span className="spanForm">
                      <OverlayTrigger 
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            Add more
                          </Tooltip>
                        }
                      >
                        <>
                        <span className="addmore" onClick={handleShow}>+</span>
                        </>
                      </OverlayTrigger> 
                      <OverlayTrigger 
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            Fetch New
                          </Tooltip>
                        }
                      >
                        <>
                        <span className="addmore" onClick={FetchNew}><AiOutlineReload /></span>
                        </>
                      </OverlayTrigger> </span>
                      <span className={ColorCode === "" ? "error":"success"}>{ErrorColor}</span>

                  </div>
                  {/* <div className="col-sm">
                    <Select
                      required
                      placeholder="?????????? ????????????"
                      className="selectdir"
                      defaultValue={ColorCode}
                      value={ColorCode}
                      onChange={setColorCode}
                      options={AllColorAr}
                      isClearable={true}
                      isSearchable={true}

                    />
                  </div> */}
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search Nationality</div>}
                      defaultValue={NationalityId}
                      onChange={setNationalityId}
                      options={AllNationality}
                      isClearable={true}
                      isSearchable={true}
                      onBlur={() => NationalityId === "" ?  setErrorNationality("Nationality is required "):setErrorNationality("Nationality is Validated ")}
                  

                    />
                    <span className="spanForm">
                      <OverlayTrigger 
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            Add more
                          </Tooltip>
                        }
                      >
                        <>
                        <span className="addmore" onClick={handleShowNationality}>+</span>
                        </>
                      </OverlayTrigger> 
                      <OverlayTrigger 
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            Fetch New
                          </Tooltip>
                        }
                      >
                        <>
                        <span className="addmore" onClick={FetchNew}><AiOutlineReload /></span>
                        </>
                      </OverlayTrigger> </span>
                      <span  className={NationalityId === "" ? "error":"success"}>{ErrorNationality}</span>
                  </div>
                </div>
          
                <div className="ButtonSection">
                  <div>
                  <label className="Multipleownerlabel">
                      Select Race Course image
                    </label>
                    <input
                      type="file"
                      onChange={onSelectFile}
                      className="formInput"
                      id="file"
                    />
                     {image && (
                      <>
                       <ImCross onClick={handlePreview} className="crossIcon"/>
                       <img src={preview} className="PreviewImage" alt="" />
                      </>
                    )}
                  </div>

                  <button type="submit" className="SubmitButton" disabled={isLoading}>
                    Add Race Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Add Color</h2>
        </Modal.Header>
        <Modal.Body>
          <ColorPopUp />
        </Modal.Body>
      </Modal>

      <Modal
        show={showNationality}
        onHide={handleCloseNationality}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Add Nationality</h2>
        </Modal.Header>
        <Modal.Body>
          <NationalityPopUp />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default RaceCourseForm;
