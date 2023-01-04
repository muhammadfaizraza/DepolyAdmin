import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useSelector ,useDispatch } from "react-redux";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { fetchnationality } from "../../redux/getReducer/getNationality";
import { AiOutlineReload } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import NationalityPopup from "../PostTable/Nationality";
import Select from "react-select"
import ColorPopup from "../PostTable/Color";


const NewsForm = () => {
  const dispatch =useDispatch()
  const { data: nationality } = useSelector((state) => state.nationality);
  const { data: color } = useSelector((state) => state.color);

const [NationalityID, setNationalityID] = useState("");
const [ColorID ,setColor] = useState("")
const [showActivenationality, setShowActivenationality] = useState(false);
const [showColor, setShowColor] = useState(false);

const handleCloseActivenationality = () => setShowActivenationality(false);
const handleCloseColor = () => setShowColor(false);

const handleShowActivenationality = async () => {
  await setShowActivenationality(true);
};
const handleShowColor = async () => {
  await setShowColor(true);
};
const FetchNew = () => {
  dispatch(fetchnationality());
};

  const history = useNavigate();
  const { state } = useLocation();

  const { courseid } = state;
  console.log(courseid)
  const [image,setImage] = useState();
  const [preview,setPreview] = useState();

  const [state1, setState] = useState({
		TrackNameEn: '',
    TrackNameAr:'',
    shortCode: '',
    AbbrevEn:"",
    AbbrevAr:"",
    NationalityID:"",
    ColorID:"",
    
    image:image
    
	});

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image, image);
  };


  useEffect(() => {
		if (courseid) {
			setState({
				TrackNameEn: courseid.TrackNameEn,
        TrackNameAr: courseid.TrackNameAr,
        AbbrevEn:courseid.AbbrevEn,
        AbbrevAr:courseid.AbbrevAr,
        shortCode: courseid.shortCode,
        NationalityID:courseid.NationalityID,
        ColorID:courseid.ColorID,
				image:courseid.image
			});
		} else {
		}
	}, [courseid]);
  useEffect(() => {
    if (image === undefined) {
      setPreview(courseid.image)
      return
  }  
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
}, [image])

  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("image", image);
      formData.append("TrackNameEn", state1.TrackNameEn);
      formData.append("AbbrevEn", state1.AbbrevEn);
      formData.append("AbbrevAr", state1.AbbrevAr);
      formData.append("TrackNameAr", state1.TrackNameAr + ' ');
      formData.append("shortCode", state1.shortCode);
      formData.append("NationalityID", NationalityID.id === undefined ? state1.NationalityID : NationalityID.id);
      formData.append("ColorID", ColorID.id === undefined ? state1.ColorID : ColorID.id);

      await axios.put(`${window.env.API_URL}/updatecourse/${courseid._id}`, formData);
      history("/racecourse");
      swal({
        title: "Success!",
        text: "Data has been Updated successfully ",
        icon: "success",
        button: "OK",
      });
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
  let AllNationality =
  nationality === undefined ? (
    <></>
  ) : (
    nationality.map(function (item) {
      return {
        id: item._id,
        value: item._id,
        label: item.NameEn,
      };
    })
  );

let AllNationalityAr =
  nationality === undefined ? (
    <></>
  ) : (
    nationality.map(function (item) {
      return {
        id: item._id,
        value: item._id,
        label: item.NameAr,
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
        value: item._id,
        label: item.NameEn,
      };
    })
  );
let AllColorAr =
  color === undefined ? (
    <></>
  ) : (
    color.map(function (item) {
      return {
        id: item._id,
        value: item._id,
        label: item.NameAr,
      };
    })
  );
  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Edit Race Course</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, TrackNameEn: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" value={state1.TrackNameEn}/>
                    </FloatingLabel>
                 
                  
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="اسم"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, TrackNameAr: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" value={state1.TrackNameAr}/>
                    </FloatingLabel>
                 
                  </div>
                </div>
                <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Abbrevation"
                    className="mb-3"
                    name="AbbrevEn"
                    onChange={(e) =>
                      setState({ ...state1, AbbrevEn: e.target.value })
                    }
                  
       
                  >
                    <Form.Control
                      required
                      name="AbbrevEn"
                      type="text"
                      placeholder="Abbrevation"
                      value={state1.AbbrevEn}
                    />
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="اختصار"
                    className="mb-3 floatingInputAr"
                    name="AbbrevAr"
                    style={{ direction: "rtl" }}
                    onChange={(e) =>
                      setState({ ...state1, AbbrevAr: e.target.value })
                    }
                  
                  >
                    <Form.Control
                      name="AbbrevAr"
                      type="text"
                      placeholder="اختصار"
                      value={state1.AbbrevAr}
                      required
                
                    />
                  </FloatingLabel>
                </div>
              </div>
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Short Code"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, shortCode: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number"  placeholder="Description" value={state1.shortCode}/>
                    </FloatingLabel>
                  
                  </div>

                </div>

                <div className="row mainrow">
                <p className="selectLabel">Nationality</p>
                    <div className="col-sm">
              
                      <Select
                        placeholder={<div>{courseid.NationalityDataRaceCourse.NameEn}</div>}
                        defaultValue={NationalityID}
                        onChange={setNationalityID}
                        options={AllNationality}
                        isClearable={true}
                        isSearchable={true}
                      />
                      <span className="spanForm">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>Add more</Tooltip>
                          }
                        >
                          <span
                            className="addmore"
                            onClick={handleShowActivenationality}
                          >
                            +
                          </span>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>Fetch New</Tooltip>
                          }
                        >
                          <span className="addmore" onClick={FetchNew}>
                            <AiOutlineReload />
                          </span>
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
                        options={AllNationalityAr}
                        isClearable={true}
                        isSearchable={true}
                      />
                    </div>
                  </div>
                  <div className="row mainrow">
                  <p className="selectLabel">Color </p>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>{courseid.ColorCodeData === null ? 'N/A': courseid.ColorCodeData.NameEn}</div>}
                      defaultValue={ColorID}
                      onChange={setColor}
                      options={AllColor}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore" onClick={handleShowColor}>
                          +
                        </span>
                      </OverlayTrigger>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id={`tooltip-top`}>Fetch New</Tooltip>
                        }
                      >
                        <span className="addmore" onClick={FetchNew}>
                          <AiOutlineReload />
                        </span>
                      </OverlayTrigger>{" "}
                      |
                    </span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد نوع الجنس</div>}
                      className="selectdir"
                      defaultValue={ColorID}
                      onChange={setColor}
                      options={AllColorAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>

                <div className="ButtonSection">
                <div>
                <input type='file' onChange={fileSelected} className="formInput"/>
                <img src={preview}  className="PreviewImage" alt=""/>

                </div>
                  <button type="submit" className="SubmitButton">
                  Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showActivenationality}
        onHide={handleCloseActivenationality}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Nationality</h2>
        </Modal.Header>
        <Modal.Body>
          <NationalityPopup />
        </Modal.Body>
      </Modal>
      <Modal
        show={showColor}
        onHide={handleCloseColor}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Color</h2>
        </Modal.Header>
        <Modal.Body>
          <ColorPopup />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewsForm;
