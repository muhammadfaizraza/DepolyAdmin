import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { fetchcategory } from "../../../redux/getReducer/getCategory";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import swal from "sweetalert";
import { AiOutlineReload } from "react-icons/ai";
import { Modal } from "react-bootstrap";

import CategoryPopup from "./AddCategory"

const TrainerForm = () => {
  // const dispatch = useDispatch();
  const history = useNavigate();
  const dispatch = useDispatch();

  const { data: category } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchcategory());
  }, []);
  const FetchNew = () => {
    dispatch(fetchcategory());
  };

  let AllCategory =
  category === undefined ? (
      <></>
    ) : (
      category.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );
  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [DescEn, setDescEn] = useState("");
  const [DescAr, setDescAr] = useState("");
  const [shortCode, setshortCode] = useState("");
  const [pickCount, setpickCount] = useState("");
  const [TriCount, setTriCount] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [CompetitionCategory, setCompetitionCategory] = useState("");
  const [CompetitionCode, setCompetitionCode] = useState("");
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();

  const [showCategory, setShowCategory] = useState(false);

  const handleCloseCategory= () => setShowCategory(false);

  const handleShowCategory = async () => {
    await setShowCategory(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("NameEn", NameEn);
      formData.append("NameAr", NameAr);
      formData.append("DescEn", DescEn);
      formData.append("DescAr", DescAr);
      // formData.append("shortCode", shortCode);
      formData.append("pickCount", pickCount);
      formData.append("TriCount", TriCount);
      formData.append("StartDate", StartDate);
      formData.append("CompetitionCategory", CompetitionCategory.id);
      formData.append("CompetitionCode", CompetitionCode);
      await axios.post(
        `${window.env.API_URL}/uploadCompetiton?keyword=&page=`,
        formData
      );

      swal({
        title: "Success!",
        text: "Data has been added Successfully",
        icon: "success",
        button: "OK",
      });
      history("/competitionlisting");
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
  

  return (
    <Fragment>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Add Competition</div>
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
                      <Form.Control type="text" placeholder="اسم" />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <DatePicker
                      onChange={setStartDate}
                      value={StartDate}
                      minDate={today}
                      dayPlaceholder=" "
                      monthPlaceholder="Start Date "
                      yearPlaceholder=""
                    />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm" style={{ direction: "rtl" }}>
                    <input
                      value={convert(StartDate)}
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
                      onChange={(e) => setDescEn(e.target.value)}
                      value={DescEn}
                    >
                      <Form.Control type="text" placeholder="Description" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="عنوان"
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setDescAr(e.target.value)}
                      name="Name"
                      value={DescAr}
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="text" placeholder="عنوان" />
                    </FloatingLabel>
                  </div>
                </div>
                {/* <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Short Name"
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
                      label="اسم قصير"
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setshortCode(e.target.value)}
                      name="Name"
                      value={shortCode}
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="text" placeholder="اسم قصير" />
                    </FloatingLabel>
                  </div>
                </div> */}
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Competition Code"
                      className="mb-3"
                      onChange={(e) => setCompetitionCode(e.target.value)}
                      name="Name"
                      value={CompetitionCode}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Competition Code"
                      />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="اسم"
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setCompetitionCode(e.target.value)}
                      name="Name"
                      value={CompetitionCode}
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="text" placeholder="اسم" />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Competition Category</div>}
                      defaultValue={CompetitionCategory}
                      onChange={setCompetitionCategory}
                      options={AllCategory}
                      isClearable={true}
                      isSearchable={true}
                    />
                 <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore" onClick={handleShowCategory}>
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
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={CompetitionCategory}
                      onChange={setCompetitionCategory}
                      options={AllCategory}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Pick Count"
                      className="mb-3"
                      onChange={(e) => setpickCount(e.target.value)}
                      value={pickCount}
                    >
                      <Form.Control type="number" placeholder="Pick Count" />
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>
{/* 
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="تفاصيل"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="number" placeholder="تفاصيل" />
                    </FloatingLabel>
                  </div> */}
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Tri Count"
                      className="mb-3"
                      onChange={(e) => setTriCount(e.target.value)}
                      value={TriCount}
                    >
                      <Form.Control type="number" placeholder="Pick Count" />
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>
{/* 
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="تفاصيل"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="number" placeholder="تفاصيل" />
                    </FloatingLabel>
                  </div> */}
                </div>
                
                

                <div
                  className="ButtonSection "
                  style={{ justifyContent: "end" }}
                >
                  <button Name="submit" className="SubmitButton">
                    Add Competition
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showCategory}
        onHide={handleCloseCategory}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Category</h2>
        </Modal.Header>
        <Modal.Body>
          <CategoryPopup />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default TrainerForm;
