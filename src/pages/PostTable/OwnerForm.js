import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import DatePicker from "react-date-picker";
import { fetchcolor } from "../../redux/getReducer/getColor";
import { fetchnationality } from "../../redux/getReducer/getNationality";
import Select from "react-select";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { AiOutlineReload } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import TextInputValidation from "../../utils/TextInputValidation";

import NationalityPopup from "./Nationality";

const OwnerForm = () => {
  //for error
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const [ErrorTitle, setErrorTitle] = useState("");
  const [ErrorTitleAr, setErrorTitleAr] = useState("");
  const [ErrorShortName, setErrorShortName] = useState("");
  const [ErrorShortNameAr, setErrorShortNameAr] = useState("");

  const [ErrorRegistration, setErrorRegistration] = useState("");

  const [ErrorNatinalty, setErrorNatinalty] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();
  const { pathname } = useLocation();

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
  const [showActivenationality, setShowActivenationality] = useState(false);

  const handleCloseActivenationality = () => setShowActivenationality(false);

  const handleShowActivenationality = async () => {
    await setShowActivenationality(true);
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
      await axios.post(`${window.env.API_URL}/createowner`, formData);
      swal({
        title: "Success!",
        text: "Data has been added successfully",
        icon: "success",
        button: "OK",
      });
      if (pathname === "/ownerform") {
        history("/owner");
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
    if (!Ownerimage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(Ownerimage);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [Ownerimage]);

  const FetchNew = () => {
    dispatch(fetchnationality());
  };
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

  const data1 = JSON.stringify(
    TextInputValidation("en", TitleEn, "Owner Title English")
  );

  const Title = JSON.parse(data1);
  const data2 = JSON.stringify(
    TextInputValidation("ar", TitleAr, "Owner Title Arabic")
  );
  const Titlear = JSON.parse(data2);
  const data3 = JSON.stringify(
    TextInputValidation("en", NameEn, "Owner Name English")
  );

  const Name = JSON.parse(data3);
  const data4 = JSON.stringify(
    TextInputValidation("ar", NameAr, "Owner Name Arabic")
  );
  const Namear = JSON.parse(data4);

  const data5 = JSON.stringify(
    TextInputValidation("en", ShortEn, "Owner Short Name English")
  );

  const shotName = JSON.parse(data5);
  const data6 = JSON.stringify(
    TextInputValidation("ar", ShortAr, "Owner Short Name Arabic")
  );
  const shotNameAr = JSON.parse(data6);

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
                      onChange={(e) => setShortEn(e.target.value)}
                      value={ShortEn}
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
                 <span className="error">{ErrorShortName.message}</span>
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
                    <DatePicker
                      onChange={setRegistrationDate}
                      value={RegistrationDate}
                      dayPlaceholder=""
                      minDate={today}
                      monthPlaceholder="Registration Date"
                      yearPlaceholder=""
                      onBlur={() =>
                        RegistrationDate === ""
                          ? setErrorRegistration(
                              "Owner Registration Date is required"
                            )
                          : setErrorRegistration(" ")
                      }
                    />
                    <span className="spanForm"> |</span>
                    <span className="error">{ErrorRegistration}</span>
                  </div>

                  <div className="col-sm" style={{ direction: "rtl" }}>
                    <DatePicker
                      onChange={setRegistrationDate}
                      value={RegistrationDate}
                      dayPlaceholder=""
                      minDate={today}
                      monthPlaceholder="تاريخ التسجيل"
                      yearPlaceholder=""
                      style={{ direction: "rtl" }}
                    />
                    {/* <input
                      style={{ direction: "rtl" }}
                      placeholder="تاريخ التسجيل"
                      value={convert(RegistrationDate)}
                    /> */}
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search Nationality</div>}
                      defaultValue={NationalityID}
                      onChange={setNationalityID}
                      options={AllNationality}
                      isClearable={true}
                      isSearchable={true}
                      onBlur={() =>
                        NationalityID === ""
                          ? setErrorNatinalty("Nationalty is required")
                          : setErrorNatinalty(" ")
                      }
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
                    <span className="error">{ErrorNatinalty}</span>
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

                <div className="SelectOwnerimage">
                  <label className="Multiplecaplabel">
                    Select Multiple Caps
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={onSelectFile1}
                    multiple
                  />
                  <div className="ButtonSection">
                    <div>
                      <label className="Multipleownerlabel">
                        Select Owner image
                      </label>

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
                      // disabled={isSubmitData}
                    >
                      Add Owner
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div></div>
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

export default OwnerForm;
