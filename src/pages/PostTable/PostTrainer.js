import React, { useState, Fragment, useEffect } from "react";
import "../../Components/CSS/forms.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { fetchnationality } from "../../redux/getReducer/getNationality";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-date-picker";
import swal from "sweetalert";
import { AiOutlineReload } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import TextInputValidation from "../../utils/TextInputValidation";
import NationalityPopup from "./Nationality";

const TrainerForm = () => {
  //for Errors
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const [ErrorTitle, setErrorTitle] = useState("");
  const [ErrorTitleAr, setErrorTitleAr] = useState("");
  const [ErrorShortName, setErrorShortName] = useState("");
  const [ErrorShortNameAr, setErrorShortNameAr] = useState("");

  const [ErrorDateofBirth, setErrorDateofBirth] = useState("");
  const [ErrorLicenseDate, setErrorLicenseDate] = useState("");
  const [ErrorRemarks, setErrorRemarks] = useState("");
  const [ErrorDetail, setErrorDetail] = useState("");
  const [ErrorNationality, setErrorNationality] = useState("");

  // const dispatch = useDispatch();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { data: nationality } = useSelector((state) => state.nationality);
  const [NameEn, setNameEn] = useState("");
  const [Detail, setDetail] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [DOB, setDOB] = useState("");
  const [TitleAr, setTitleAr] = useState("");
  const [TitleEn, setTitleEn] = useState("");
  const [TrainerLicenseDate, setTrainerLicenseDate] = useState("");
  const [ShortNameEn, setShortNameEn] = useState("");
  const [ShortNameAr, setShortNameAr] = useState("");

  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [NationalityId, setNationalityId] = useState("");

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
      formData.append("Detail", Detail);
      formData.append("Remarks", Remarks);
      formData.append("NameAr", NameAr + " ");
      formData.append("DOB", DOB);
      formData.append("TitleAr", TitleAr);
      formData.append("NationalityID", NationalityId.id);
      formData.append("TitleEn", TitleEn);
      formData.append("TrainerLicenseDate", TrainerLicenseDate);
      formData.append("ShortNameEn", ShortNameEn);
      formData.append("ShortNameAr", ShortNameAr + " ");
      await axios.post(
        `${window.env.API_URL}/uploadtrainer?keyword=&page=`,
        formData
      );

      swal({
        title: "Success!",
        text: "Data has been added successfully",
        icon: "success",
        button: "OK",
      });
      if (pathname === "/trainerform") {
        history("/trainer");
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
  const FetchNew = () => {
    dispatch(fetchnationality());
  };
  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
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
//Checking Validation
  const data1 = JSON.stringify(
    TextInputValidation("en", TitleEn, "Trainer Title English")
  );

  const Title = JSON.parse(data1);
  const data2 = JSON.stringify(
    TextInputValidation("ar", TitleAr, "Trainer Title Arabic")
  );
  const Titlear = JSON.parse(data2);
  const data3 = JSON.stringify(
    TextInputValidation("en", NameEn, "Trainer Name English")
  );

  const Name = JSON.parse(data3);
  const data4 = JSON.stringify(
    TextInputValidation("ar", NameAr, "Trainer Name Arabic")
  );
  const Namear = JSON.parse(data4);

  const data5 = JSON.stringify(
    TextInputValidation("en", ShortNameEn, "Trainer Short Name English")
  );

  const shotName = JSON.parse(data5);
  const data6 = JSON.stringify(
    TextInputValidation("ar", ShortNameAr, "Trainer Short Name Arabic")
  );
  const shotNameAr = JSON.parse(data6);

  const data7 = JSON.stringify(
    TextInputValidation("en", Detail, "Trainer Description English")
  );
  const detail = JSON.parse(data7);

  const data8 = JSON.stringify(
    TextInputValidation("en", Remarks, "Trainer Remarks English")
  );
  const Remark = JSON.parse(data8);

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
                    <DatePicker
                      onChange={setDOB}
                      value={DOB}
                      maxDate={today}
                      dayPlaceholder=" "
                      monthPlaceholder="Date of Birth "
                      yearPlaceholder=""
                      onBlur={() =>
                        DOB === ""
                          ? setErrorDateofBirth(
                              "Trainer Date of Birth is required"
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
                      onChange={setTrainerLicenseDate}
                      value={TrainerLicenseDate}
                      dayPlaceholder="  "
                      maxDate={today}
                      monthPlaceholder="License Date"
                      yearPlaceholder=""
                      onBlur={() =>
                        DOB === ""
                          ? setErrorLicenseDate(
                              "Trainer License Date is required"
                            )
                          : setErrorLicenseDate(" ")
                      }
                    />

                    <span className="spanForm"> |</span>
                    <span className="error"> {ErrorLicenseDate}</span>
                  </div>

                  <div className="col-sm" style={{ direction: "rtl" }}>
                    <DatePicker
                      onChange={setTrainerLicenseDate}
                      value={TrainerLicenseDate}
                      dayPlaceholder="  "
                      maxDate={today}
                      monthPlaceholder="تاريخ التسجيل"
                      yearPlaceholder=""
                      style={{ direction: "rtl" }}
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
                      onBlur={() => setErrorTitle(Title)}
                    >
                      <Form.Control type="text" placeholder="Title" required />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                    <span className="error">{ErrorTitle.message}</span>
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
                      onBlur={() => setErrorTitleAr(Titlear)}
                    >
                      <Form.Control type="text" placeholder="عنوان" required />
                    </FloatingLabel>
                    <span className="errorAr">{ErrorTitleAr.message}</span>
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
                      label="Details"
                      className="mb-3"
                      onChange={(e) => setDetail(e.target.value)}
                      value={Detail}
                      onBlur={() => setErrorDetail(detail)}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Details"
                        required
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                    <span className="error">{ErrorDetail.message}</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="تفاصيل"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="text" placeholder="تفاصيل" />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Nationality</div>}
                      defaultValue={NationalityId}
                      onChange={setNationalityId}
                      options={AllNationality}
                      isClearable={true}
                      isSearchable={true}
                      onBlur={() => NationalityId === ""? setErrorNationality("Nationality is required"):setErrorNationality("")}
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
                      </OverlayTrigger>{" "}
                      |
                    </span>

                    <span className="error">{ErrorNationality}</span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={NationalityId}
                      onChange={setNationalityId}
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
                      label="Remarks"
                      className="mb-3"
                      onChange={(e) => setRemarks(e.target.value)}
                      value={Remarks}
                    onBlur={() => setErrorRemarks(Remark)}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Details"
                        required
                      />
                    </FloatingLabel>
                    <span className="error">{ErrorRemarks.message}</span>
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="ملاحظات"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="text" placeholder="ملاحظات" />
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="ButtonSection">
                  <div>
                    <label className="Multipleownerlabel">
                      Select Trainer image
                    </label>
                    <input
                      type="file"
                      onChange={onSelectFile}
                      className="formInput"
                    />
                    {image && (
                      <img src={preview} className="PreviewImage" alt="" />
                    )}
                  </div>

                  <button type="submit" className="SubmitButton">
                    Add Trainer
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
    </Fragment>
  );
};

export default TrainerForm;
