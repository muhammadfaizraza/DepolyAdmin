import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-date-picker";
import "../../Components/CSS/forms.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { add } from "../../redux/postReducer/PostJockey";
import { fetchnationality } from "../../redux/getReducer/getNationality";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import Select from "react-select";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { AiOutlineReload } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import TextInputValidation from "../../utils/TextInputValidation";
import NationalityPopup from "./Nationality";

const NewsForm = () => {
  //for Errors
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");

  const [ErrorShortName, setErrorShortName] = useState("");
  const [ErrorShortNameAr, setErrorShortNameAr] = useState("");

  const [ErrorDateofBirth, setErrorDateofBirth] = useState("");
  const [ErrorLicenseDate, setErrorLicenseDate] = useState("");
  const [ErrorRemarks, setErrorRemarks] = useState("");
  const [ErrorRemarksAr, setErrorRemarksAr] = useState("");
  const [ErrorRating, setErrorRating] = useState("");
  const [ErrorMinWeight, setErrorMinWeight] = useState("");
  const [ErrorMaxWeight, setErrorMaxWeight] = useState("");
  const [ErrorAllowance, setErrorAllowance] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();
  const { pathname } = useLocation();

  const { data: nationality } = useSelector((state) => state.nationality);
  var today = new Date();

  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [ShortNameEn, setShortNameEn] = useState("");
  const [ShortNameAr, setShortNameAr] = useState("");
  const [RemarksEn, setRemarksEn] = useState("");
  const [RemarksAr, setRemarksAr] = useState("");
  const [DOB, setDOB] = useState("");
  const [JockeyLicenseDate, setJockeyLicenseDate] = useState("");
  const [Rating, setRating] = useState("");
  const [MiniumumJockeyWeight, setMiniumumJockeyWeight] = useState("");
  const [MaximumJockeyWeight, setMaximumJockeyWeight] = useState("");
  const [JockeyAllowance, setJockeyAllowance] = useState("");
  const [image, setImage] = useState();
  const [NationalityID, setNationalityID] = useState("");
  const [preview, setPreview] = useState();

  const [showActivenationality, setShowActivenationality] = useState(false);

  const handleCloseActivenationality = () => setShowActivenationality(false);

  const handleShowActivenationality = async () => {
    await setShowActivenationality(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("NameEn", NameEn);
      formData.append("ShortNameEn", ShortNameEn);
      formData.append("ShortNameAr", ShortNameAr);
      formData.append("JockeyAllowance", JockeyAllowance);
      formData.append("NameAr", NameAr);
      formData.append("DOB", DOB);
      formData.append("RemarksEn", RemarksEn);
      formData.append("NationalityID", NationalityID.ID);
      formData.append("RemarksAr", RemarksAr);
      formData.append("MiniumumJockeyWeight", MiniumumJockeyWeight);
      formData.append("MaximumJockeyWeight", MaximumJockeyWeight);
      formData.append("Rating", Rating);
      formData.append("JockeyLicenseDate", JockeyLicenseDate);

      await axios.post(`${window.env.API_URL}/uploadJockey`, formData);
      swal({
        title: "Success!",
        text: "Data has been added Successfully",
        icon: "success",
        button: "OK",
      });
      if (pathname === "/jockeyform") {
        history("/jockey");
      }
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

 
  useEffect(() => {
    dispatch(fetchnationality());
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image, dispatch]);
  const FetchNew = () => {
    dispatch(fetchnationality());
  };
  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
  };
  const ref = useRef();

  const convert = (num) => {
    if (num) {
      var date = new Date(num);
      var months = [
        "يناير",
        "فبراير",
        "مارس",
        "إبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ];
      var days = [
        "اﻷحد",
        "اﻷثنين",
        "الثلاثاء",
        "اﻷربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ];
      var delDateString =
        days[date.getDay()] +
        " " +
        date.getDate() +
        " " +
        months[date.getMonth()] +
        " " +
        date.getFullYear();

      return delDateString;
    }
  };

  let AllNationality =
    nationality === undefined ? (
      <></>
    ) : (
      nationality.map(function (item) {
        return {
          ID: item._id,
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
  //Checking Validation

  const data3 = JSON.stringify(
    TextInputValidation("en", NameEn, "Jockey Name English")
  );

  const Name = JSON.parse(data3);
  const data4 = JSON.stringify(
    TextInputValidation("ar", NameAr, "Jockey Name Arabic")
  );
  const Namear = JSON.parse(data4);

  const data5 = JSON.stringify(
    TextInputValidation("en", ShortNameEn, "Jockey Short Name English")
  );

  const shotName = JSON.parse(data5);
  const data6 = JSON.stringify(
    TextInputValidation("ar", ShortNameAr, "Jockey Short Name Arabic")
  );
  const shotNameAr = JSON.parse(data6);

  const data8 = JSON.stringify(
    TextInputValidation("en", RemarksEn, "Jockey Remarks English")
  );
  const Remark = JSON.parse(data8);
  const data9 = JSON.stringify(
    TextInputValidation("en", RemarksAr, "Jockey Remarks Arabic")
  );
  const Remarkar = JSON.parse(data9);

  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Add Jockey</div>
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
                      onBlur={() => setError(Name)}
                    >
                      <Form.Control type="text" placeholder="Name" required />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                    <span className="error">{Error.message}</span>
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
                      onBlur={() => setErrorAr(Namear)}
                    >
                      <Form.Control type="text" placeholder="اسم" required />
                    </FloatingLabel>
                    <span className="errorAr">{ErrorAr.message}</span>
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
                      onBlur={() => setErrorShortName(shotName)}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Short Name"
                        required
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                    <span className="error">{ErrorShortName.message}</span>
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
                      onBlur={() => setErrorShortNameAr(shotNameAr)}
                    >
                      <Form.Control
                        type="text"
                        placeholder="اسم قصير"
                        required
                      />
                    </FloatingLabel>
                    <span className="errorAr">{ErrorShortNameAr.message}</span>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Remarks"
                      className="mb-3"
                      onChange={(e) => setRemarksEn(e.target.value)}
                      value={RemarksEn}
                      onBlur={() => setErrorRemarks(Remark)}
                    >
                      <Form.Control 
                        type="text"
                        placeholder="Remarks"
                        required
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                    <span className="error">{ErrorRemarks.message}</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="ملاحظات"
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setRemarksAr(e.target.value)}
                      name="Name"
                      value={RemarksAr}
                      style={{ direction: "rtl" }}
                      onBlur={() => setErrorRemarksAr(Remarkar)}
                    >
                      <Form.Control
                        type="text"
                        placeholder="ملاحظات"
                        required
                      />
                    </FloatingLabel>
                    <span className="errorAr">{ErrorRemarksAr.message}</span>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <DatePicker
                      onChange={setDOB}
                      value={DOB}
                      dayPlaceholder="  "
                      maxDate={today}
                      monthPlaceholder="Date of Birth "
                      yearPlaceholder=""
                      onBlur={() =>
                        DOB === ""
                          ? setErrorDateofBirth(
                              "Jockey Date Of Birth is required"
                            )
                          : setErrorDateofBirth(" ")
                      }
                    />
                    <span className="spanForm"> |</span>
                    <span className="error">{ErrorDateofBirth}</span>
                  </div>

                  <div className="col-sm" style={{ direction: "rtl" }}>
                    <DatePicker
                      onChange={setDOB}
                      value={DOB}
                      maxDate={today}
                      dayPlaceholder="  "
                      monthPlaceholder="تاريخ الولادة"
                      yearPlaceholder=""
                      style={{ direction: "rtl" }}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <DatePicker
                      onChange={setJockeyLicenseDate}
                      value={JockeyLicenseDate}
                      dayPlaceholder="  "
                      maxDate={today}
                      monthPlaceholder="License Date"
                      yearPlaceholder=""
                      onBlur={() =>
                        DOB === ""
                          ? setErrorLicenseDate(
                              "Jockey License Date is required"
                            )
                          : setErrorLicenseDate(" ")
                      }
                    />

                    <span className="spanForm"> |</span>
                    <span className="error">{ErrorLicenseDate}</span>
                  </div>

                  <div className="col-sm" style={{ direction: "rtl" }}>
                    <DatePicker
                      onChange={setJockeyLicenseDate}
                      value={JockeyLicenseDate}
                      dayPlaceholder="  "
                      maxDate={today}
                      monthPlaceholder="تاريخ التسجيل"
                      yearPlaceholder=""
                      style={{ direction: "rtl" }}
                    />
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Nationality</div>}
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
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={NationalityID}
                      onChange={setNationalityID}
                      options={AllNationalityAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Rating"
                      className="mb-3"
                      onChange={(e) => setRating(e.target.value)}
                      value={Rating}
                      onBlur={(e) => Rating === "" ?  setErrorRating("Jockey Rating is required "):setErrorRating(" ")}
                   
                    >
                      <Form.Control
                        type="number"
                        placeholder="Rating"
                        required
                      />
                    </FloatingLabel>
<span className="error">{ErrorRating}</span>
                    {/* <span className="spanForm"> |</span> */}
                  </div>
                  {/* 
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="معدل"
                      className="mb-3 floatingInputAr"
                      name="Name"
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="number" placeholder="معدل" />
                    </FloatingLabel>
                  </div> */}
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Jockey Minimum Weight"
                      className="mb-3"
                      onChange={(e) => setMiniumumJockeyWeight(e.target.value)}
                      value={MiniumumJockeyWeight}
                      onBlur={(e) => MiniumumJockeyWeight === "" ?  setErrorMinWeight("Jockey Rating is required "):setErrorMinWeight(" ")}
                    >
                      <Form.Control
                        type="number"
                        placeholder="Jockey Minimum Weight"
                        min="0"
                        required
                      />
                    </FloatingLabel>
<span className="error">{ErrorMinWeight}</span>
                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الحد الأدنى لوزن الجوكي"
                      className="mb-3 floatingInputAr"
                      value={MiniumumJockeyWeight}
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control
                        type="number"
                        placeholder="الحد الأدنى لوزن الجوكي"
                      />
                    </FloatingLabel>
                  </div> */}
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Jockey Maximum Weight"
                      className="mb-3"
                      onChange={(e) => setMaximumJockeyWeight(e.target.value)}
                      value={MaximumJockeyWeight}
                      onBlur={(e) => MaximumJockeyWeight === "" ?  setErrorMaxWeight("Jockey Rating is required "):setErrorMaxWeight(" ")}
                    >
                      <Form.Control
                        type="number"
                        placeholder="Jockey Maximum Weight"
                        min="0"
                        required
                      />
                    </FloatingLabel>
                    <span className="error">{ErrorMaxWeight}</span>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الحد الأدنى لوزن الجوكي"
                      className="mb-3 floatingInputAr"
                      value={MaximumJockeyWeight}
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control
                        type="number"
                        placeholder="الحد الأدنى لوزن الجوكي"
                        min='0'
                      />
                    </FloatingLabel>
                  </div> */}
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Jockey Allowance"
                      className="mb-3"
                      onChange={(e) => setJockeyAllowance(e.target.value)}
                      value={JockeyAllowance}
                      onBlur={(e) => JockeyAllowance === "" ?  setErrorAllowance("Jockey Rating is required "):setErrorAllowance(" ")}
                    >
                      <Form.Control
                        type="number"
                        placeholder="Jockey Allowance"
                        min="0"
                        required
                      />
                    </FloatingLabel>
<span className="error">{ErrorAllowance}</span>
                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الحد الأدنى لوزن الجوكي"
                      className="mb-3 floatingInputAr"
                      value={JockeyAllowance}
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control
                        type="number"
                        placeholder="الحد الأدنى لوزن الجوكي"
                        min='0'
                      />
                    </FloatingLabel>
                  </div> */}
                </div>

                <div className="ButtonSection">
                  <div>
                    <label className="Multipleownerlabel">
                      Select Jockey image
                    </label>
                    <input
                      type="file"
                      onChange={onSelectFile}
                      className="formInput"
                    />
                    {image && (
                      <img src={preview} alt="" className="PreviewImage" />
                    )}
                  </div>

                  <button type="submit" className="SubmitButton">
                    Add Jockey
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
