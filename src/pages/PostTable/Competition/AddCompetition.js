import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import swal from "sweetalert";
import { AiOutlineReload } from "react-icons/ai";
import TextInputValidation from "../../../utils/TextInputValidation";
import { fetchcategory } from "../../../redux/getReducer/getCategory";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { fetchSponsor } from "../../../redux/getReducer/getSponsorSlice";

const CategoryType = [
    {
        id: 1,
        value: 'pick',
        label: 'Pick',
    },
    {
        id: 1,
        value: 'cast',
        label: 'Cast',
    }
    
]

const TrainerForm = () => {
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const [ErrorSponsor, setErrorSponsor] = useState("");

  // const [ErrorDesc, setErrorDesc] = useState("");
  // const [ErrorDescAr, setErrorDescAr] = useState("");
  // const [ErrorCode, setErrorCode] = useState("");
  // const [ErrorPickCount, setErrorPickCount] = useState("");
  // const [ErrorCategory, setErrorCategory] = useState("");

  const [ErrorDate, setErrorDate] = useState("");
  const [ErrorTriCount, setErrorTriCount] = useState("");
  const [ErrorCategory, setErrorCategory] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const history = useNavigate();
  const dispatch = useDispatch();

  const { data: category } = useSelector((state) => state.category);
  const { data: sponsor } = useSelector((state) => state.sponsor);

  useEffect(() => {
    dispatch(fetchcategory());
    dispatch(fetchSponsor());
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

  let AllCategoryAr =
    category === undefined ? (
      <></>
    ) : (
      category.map(function (item) {
        return {
          id: item._id,
          value: item.NameAr,
          label: item.NameAr,
        };
      })
    );

    let SponsorForTheRace =
    sponsor === undefined ? (
      <></>
    ) : (
      sponsor.map(function (item) {
        return {
          id: item._id,
          value: item.image,
          label: (
            <div>
              <img src={item.image} height="30px" width="30px" />{" "}
            </div>
          ),
        };
      })
    );

  let SponsorForTheRaceAr =
    sponsor === undefined ? (
      <></>
    ) : (
      sponsor.map(function (item) {
        return {
          id: item._id,
          value: item.TitleAr,
          label: item.TitleAr,
        };
      })
    );


  const [NameAr, setNameAr] = useState("");
  const [NameEn, setNameEn] = useState("");
  const [CodeEn, setCodeEn] = useState("");
  const [CodeAr, setCodeAr] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Type, setType] = useState("");
  const [NumberOfRace, setNumberOfRace] = useState("");
  const [CompetitionCategory, setCompetitionCategory] = useState("");
  const [Sponsor, setSponsor] = useState("");

  // const [NumberOfPosition, setNumberOfPosition] = useState("");



  const submit = async (event) => {
    event.preventDefault();
    // history('/competitionrace')
    try {
      const formData = new FormData();
      formData.append("NameEn", NameEn);
      formData.append("NameAr", NameAr);
      formData.append("CompetitionCode", CodeEn);
      formData.append("StartDate", StartDate);
      formData.append("EndDate", EndDate);
      formData.append("CompetitionCategory", Type.value);
      formData.append("CategoryCount", NumberOfRace);
      formData.append("CompetitionCategory", CompetitionCategory.id);

      const res = await axios.post(
        `${window.env.API_URL}/uploadCompetiton`,
        formData
      );
      swal({
        title: "Success!",
        text: "Data has been added Successfully",
        icon: "success",
        button: "OK",
      });
      const CompetitionId = res.data.data;
      history("/competitionrace", {
        state: {
          CompetitionId: CompetitionId
        },
      });
      
    } catch (error) {
      const err = error.response.data.message;
      console.log(err,'err 22')
      swal({
        title: "Error!",
        text: err[0],
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

  const data1 = JSON.stringify(
    TextInputValidation("en", NameEn, "Competition Name English")
  );

  const obj = JSON.parse(data1);
  const data2 = JSON.stringify(
    TextInputValidation("ar", NameAr, "Competition Name Arabic")
  );
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
            <div className="Headers"> 
             <h4>Competition</h4>
            </div>
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
                      onBlur={() => setError(obj)}
                    >
                      <Form.Control type="text" placeholder="Name" />
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
                      onBlur={() => setErrorAr(objAr)}
                    >
                      <Form.Control type="text" placeholder="اسم" />
                    </FloatingLabel>
                    <span className="errorAr">{ErrorAr.message}</span>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Code"
                      className="mb-3"
                      onChange={(e) => setCodeEn(e.target.value)}
                      name="Name"
                      value={CodeEn}
                      onBlur={() => setError(obj)}
                    >
                      <Form.Control type="text" placeholder="Name" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                    <span className="error">{Error.message}</span>
                  </div>
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الشفرة                      "
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setCodeAr(e.target.value)}
                      name="Name"
                      value={CodeAr}
                      style={{ direction: "rtl" }}
                      onBlur={() => setErrorAr(objAr)}
                    >
                      <Form.Control type="text" placeholder="اسم" />
                    </FloatingLabel>
                    <span className="errorAr">{ErrorAr.message}</span>
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
                      onBlur={(e) =>
                        StartDate === ""
                          ? setErrorDate("Competition Start Date is required")
                          : setErrorDate(" ")
                      }
                    />
                    <span className="spanForm">|</span>
                    <span className="error">{ErrorDate}</span>
                  </div>

                  <div className="col-sm" style={{ direction: "rtl" }}>
                  <DatePicker
                      onChange={setStartDate}
                      value={StartDate}
                      dayPlaceholder=""
                      minDate={today}
                      monthPlaceholder="تاريخ البدء"
                      yearPlaceholder=""
                      style={{ direction: "rtl" }}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <DatePicker
                      onChange={setEndDate}
                      value={EndDate}
                      minDate={today}
                      dayPlaceholder=" "
                      monthPlaceholder="End Date "
                      yearPlaceholder=""
                      onBlur={(e) =>
                        StartDate === ""
                          ? setErrorDate("Competition Start Date is required")
                          : setErrorDate(" ")
                      }
                    />
                    <span className="spanForm">|</span>
                    <span className="error">{ErrorDate}</span>
                  </div>

                  <div className="col-sm" style={{ direction: "rtl" }}>
                  <DatePicker
                      onChange={setEndDate}
                      value={EndDate}
                      dayPlaceholder=""
                      minDate={today}
                      monthPlaceholder="تاريخ الانتهاء "
                      yearPlaceholder=""
                      style={{ direction: "rtl" }}
                    />
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
                      onBlur={() =>
                        CompetitionCategory === ""
                          ? setErrorCategory("Competition is required")
                          : setErrorCategory("")
                      }
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore">
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
                    <span className="error">{ErrorCategory}</span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={CompetitionCategory}
                      onChange={setCompetitionCategory}
                      options={AllCategoryAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Sponsor Image</div>}
                      defaultValue={Sponsor}
                      onChange={setSponsor}
                      options={SponsorForTheRace}
                      isClearable={true}
                      isSearchable={true}
                      onBlur={() => Sponsor === "" ? setErrorSponsor("Sponsor is required ") : setErrorSponsor("")}

                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore">
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
                      placeholder={<div>نوع السباق</div>}
                      defaultValue={Sponsor}
                      onChange={setSponsor}
                      options={SponsorForTheRace}
                      className="selectdir"
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type/Category</div>}
                      defaultValue={Type}
                      onChange={setType}
                      options={CategoryType}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      |
                    </span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={Type}
                      onChange={setType}
                      options={CategoryType}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
              
                {
                  Type === null ? <></> :  (Type.value === 'cast' ? <>
                  
                  <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="No of Postion"
                      className="mb-3"
                      onChange={(e) => setNumberOfRace(e.target.value)}
                      value={NumberOfRace}
                      min="1"
                      max="12"
                      onBlur={(e) =>
                        NumberOfRace === ""
                          ? setErrorTriCount("TriCount  Number is required ")
                          : setErrorTriCount(" ")
                      }
                    >
                      <Form.Control
                        type="number"
                        min="1"
                      max="12"
                        placeholder="Pick Count"
                      />
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
                      <Form.Control type="number" placeholder="تفاصيل" />
                    </FloatingLabel>
                  </div>
                </div>
                  </> : <>
                  
                  
                  
                  <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="# of Races"
                      className="mb-3"
                      onChange={(e) => setNumberOfRace(e.target.value)}
                      value={NumberOfRace}
                      onBlur={(e) =>
                        NumberOfRace === ""
                          ? setErrorTriCount("TriCount  Number is required ")
                          : setErrorTriCount(" ")
                      }
                    >
                      <Form.Control
                        type="number"
                        min="2" max="5"
                        placeholder="Pick Count"
                      />
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
                      <Form.Control type="number"min="2"
                        max="12" placeholder="تفاصيل" />
                    </FloatingLabel>
                  </div>
                </div>
                  </>)
                }
         

                

                <div
                  className="ButtonSection "
                  style={{ justifyContent: "end" }}
                >
                  <div className="sbmtbtndiv">
                <div className="RaceButtonDiv">
                  <button className="updateButton">
                    Update
                  </button>

                  <button
                    className="SubmitButton"
                    type="submit"
                    onClick={submit}
                   
                  >
                   Add Races
                  </button>
                </div>
              </div>
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
