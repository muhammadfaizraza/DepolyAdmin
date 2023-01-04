import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import DatePicker from "react-date-picker";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { fetchnationality } from "../../redux/getReducer/getNationality";
import { useDispatch } from "react-redux";
import  Select  from "react-select";
import { useSelector } from "react-redux";
import { Tooltip ,OverlayTrigger} from "react-bootstrap";
import {AiOutlineReload} from "react-icons/ai"
import { Modal } from "react-bootstrap";
import NationalityPopup from "../PostTable/Nationality";

const NewsForm = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { data: nationality } = useSelector((state) => state.nationality);
  const [TrainerLicenseDate, setTrainerLicenseDate] = useState("");
  const [NationalityID, setNationalityID] = useState("");
   const [showActivenationality, setShowActivenationality] = useState(false);
  const handleCloseActivenationality = () => setShowActivenationality(false);

  const handleShowActivenationality = async () => {
    await setShowActivenationality(true);
  };
  const FetchNew = () => {
    dispatch(fetchnationality());
  };
  
  const [DOB, setDOB] = useState("");
  var today = new Date();

  const { trainerid } = state;

  const [state1, setState] = useState({
    NameEn: "",
    NameAr: "",
    TitleEn: "",
    TitleAr: "",
    ShortNameEn: "",
    ShortNameAr: "",
    RemarksEn: "",
    RemarksAr: "",
    DetailEn: "",
    DetailAr: "",
    TrainerLicenseDate: "",
    DOB: "",
    NationalityID:""
  });

  const [preview, setPreview] = useState();

  const [image, setImage] = useState();

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
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

let AllNationalityAr =
  nationality === undefined ? (
    <></>
  ) : (
    nationality.map(function (item) {
      return {
        id: item._id,
        value: item.NameAr,
        label: item.NameAr,
      };
    })
  );
  let dateall = Date.parse(trainerid.TrainerLicenseDate);
  console.log(trainerid, "dateall 4324");

  console.log(dateall, "dateall 1");
  useEffect(() => {
    if (trainerid) {
      setState({
        NameEn: trainerid.NameEn,
        NameAr: trainerid.NameAr,
        TitleEn: trainerid.TitleEn,
        TitleAr: trainerid.TitleAr,
        ShortNameEn: trainerid.ShortNameEn,
        ShortNameAr: trainerid.ShortNameAr,
        RemarksEn: trainerid.RemarksEn,
        RemarksAr: trainerid.RemarksAr,
        DetailEn: trainerid.DetailEn,
        DetailAr: trainerid.DetailAr,
        TrainerLicenseDate: trainerid.TrainerLicenseDate,
        NationalityID:trainerid.NationalityID
      });
    } else {
    }
  }, [trainerid]);

  useEffect(() => {
    dispatch(fetchnationality());
  });
  useEffect(() => {
    if (image === undefined) {
      setPreview(trainerid.image);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr);
      formData.append("TitleEn", state1.TitleEn);
      formData.append("TitleAr", state1.TitleAr);
      formData.append("RemarksEn", state1.RemarksEn);
      formData.append("RemarksAr", state1.RemarksAr);
      formData.append("ShortNameEn", state1.ShortNameEn);
      formData.append("ShortNameAr", state1.ShortNameAr);
      formData.append("DetailEn", state1.DetailEn);
      formData.append("DetailAr", state1.DetailAr);
      formData.append("TrainerLicenseDate", TrainerLicenseDate);
      formData.append("NationalityID", NationalityID.id === undefined ? state1.NationalityID : NationalityID.id);

      formData.append("DOB", DOB);

      const response = await axios.put(
        `${window.env.API_URL}/updatetrainer/${trainerid._id}`,
        formData
      );
      history("/trainer");
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
  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Edit Trainer</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, NameEn: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.NameEn}
                      />
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
                        setState({ ...state1, NameAr: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.NameAr}
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Short Name"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, ShortNameEn: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.ShortNameEn}
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="اسم قصير"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, ShortNameAr: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.ShortNameAr}
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Title"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, TitleEn: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.TitleEn}
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="لقب"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, TitleAr: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.TitleAr}
                      />
                    </FloatingLabel>
                  </div>
                </div>
                {/* <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Remarks"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, Remarks: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.Remarks}/>
                    </FloatingLabel>
                
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="اسم"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, NameAr: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.NameAr}/>
                    </FloatingLabel>
                    
                  </div>
                </div> */}

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Detail"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, DetailEn: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.DetailEn}
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="التفاصيل"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, DetailAr: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.NameAr}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Remarks"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, RemarksEn: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.RemarksEn}
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="ملاحظات"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, RemarksAr: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.RemarksAr}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row mainrow">
                  <DatePicker
                    onChange={setTrainerLicenseDate}
                    value={TrainerLicenseDate}
                    dayPlaceholder=""
                    maxDate={today}
                    monthPlaceholder={state1.TrainerLicenseDate}
                    yearPlaceholder=""
                    className="editDate"
                  />

                  {/* <div className="col-sm" style={{ direction: "rtl" }}>
                    <input
                      
                      placeholder="تاريخ الولادة"
                    />
                  </div> */}
                </div>
                <div className="row mainrow">
                <p className="selectLabel">Nationality</p>
                    <div className="col-sm">
              
                      <Select
                        placeholder={<div>{trainerid.TrainerNationalityData.NameEn}</div>}
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
                  <DatePicker
                    onChange={setDOB}
                    value={DOB}
                    dayPlaceholder=""
                    maxDate={today}
                    monthPlaceholder={state1.DOB}
                    yearPlaceholder=""
                    className="editDate"
                  />

                  {/* <div className="col-sm" style={{ direction: "rtl" }}>
              <input
                
                placeholder="تاريخ الولادة"
              />
            </div> */}
                </div>
         
                <div className="ButtonSection">
                  <div>
                    <input
                      type="file"
                      onChange={fileSelected}
                      className="formInput"
                    />
                    <img src={preview} className="PreviewImage" alt="" />
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
    </>
  );
};

export default NewsForm;
