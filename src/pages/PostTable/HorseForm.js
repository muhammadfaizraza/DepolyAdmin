import React, { Fragment, useState, useEffect } from "react";
import { fetchTrainer } from "../../redux/getReducer/getTrainerSlice";
import { add } from "../../redux/postReducer/PostHorse";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-select";
import { fetchOwner } from "../../redux/getReducer/getOwnerSlice";
import { fetchHorse } from "../../redux/getReducer/getHorseSlice";
import { fetchcolor } from "../../redux/getReducer/getColor";
import { fetchbreeder } from "../../redux/getReducer/getBreeder";
import { fetchnationality } from "../../redux/getReducer/getNationality";
import { fetchgender } from "../../redux/getReducer/getGenderSlice";
import { fetchHorseKind } from "../../redux/getReducer/getHorseKind";
import DatePicker from "react-date-picker";
import Moment from "react-moment";
import swal from "sweetalert";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Gender = [
  { id: "1", value: "Male", label: "Male" },
  { id: "2", value: "Female", label: "Female" },
  { id: "3", value: "Cross Gender", label: "Cross Gender" },
];
const Gelted = [
  { id: "0", value: "false", label: "false" },
  { id: "1", value: "true", label: "true" },
];
const HorseStatusAll = [
  { id: "0", value: "false", label: "false" },
  { id: "1", value: "true", label: "true" },
];

const Foals = [
  { id: "0", value: "1", label: "1" },
  { id: "1", value: "2", label: "2" },
  { id: "2", value: "3", label: "3" },
  { id: "3", value: "4", label: "4" },
  { id: "4", value: "5", label: "5" },
  { id: "5", value: "6", label: "6" },
  { id: "6", value: "7", label: "7" },
  { id: "7", value: "8", label: "8" },
  { id: "8", value: "9", label: "9" },
  { id: "9", value: "10", label: "10" },
];

const HorseForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [isClearable, setIsClearable] = useState(true);

  const { data: trainer } = useSelector((state) => state.trainer);
  const { data: owner } = useSelector((state) => state.owner);
  const { data: horse } = useSelector((state) => state.horse);
  const { data: color } = useSelector((state) => state.color);
  const { data: breeder } = useSelector((state) => state.breeder);
  const { data: nationality } = useSelector((state) => state.nationality);
  const { data: gender } = useSelector((state) => state.gender);
  const { data: HorseKind } = useSelector((state) => state.HorseKind);

  useEffect(() => {
    dispatch(fetchOwner());
    dispatch(fetchTrainer());
    dispatch(fetchHorse());
    dispatch(fetchcolor());
    dispatch(fetchbreeder());
    dispatch(fetchnationality());
    dispatch(fetchgender());
    dispatch(fetchHorseKind());
  }, [dispatch]);

  let horseoptions =
    horse === undefined ? (
      <></>
    ) : (
      horse.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );

  let horsekindoptions =
    HorseKind === undefined ? (
      <></>
    ) : (
      HorseKind.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );

  let traineroption =
    trainer === undefined ? (
      <></>
    ) : (
      trainer.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );

  let owneroption =
    owner === undefined ? (
      <></>
    ) : (
      owner.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
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
          label: item.NameEn,
        };
      })
    );

  let AllBreeder =
    breeder === undefined ? (
      <></>
    ) : (
      breeder.map(function (item) {
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

  let AllGender =
    gender === undefined ? (
      <></>
    ) : (
      gender.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );

  // let jockeyoption =  jockey === undefined ? <></> : jockey.map(function (item) {
  //   return {
  //     id: item._id,
  //     value: item.Name,
  //     label: item.Name,
  //   };
  // });


  const [ActiveOwner, setActiveOwner] = useState("");
  // const [Jockey, setJockey] = useState("");
  const [Age, setAge] = useState("");
  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [Owner, setOwner] = useState("");
  const [ActiveTrainer, setActiveTrainer] = useState("");
  // const [ActiveJockey, setActiveJockey] = useState("");
  const [Breeder, setBreeder] = useState("");
  // const [Trainer, setTrainer] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [HorseStatus, setHorseStatus] = useState("");
  const [Sex, setSex] = useState("");
  const [ColorID, setColor] = useState("");
  const [KindOfHorse, setKindOfHorse] = useState("");
  const [Dam, setDam] = useState("");
  const [Sire, setSire] = useState("");
  const [DOB, setDOB] = useState("");
  const [CreationId, setCreationId] = useState("");
  const [GSire, setGSire] = useState("");
  // const [WinningAmount, setWinningAmount] = useState("");
  const [OverAllRating, setOverAllRating] = useState("");
  const [image, setimage] = useState();
  const [Foal, setFoal] = useState("");
  const [Cap, setCap] = useState("");
  const [STARS, setSTARS] = useState(0);
  const [isGelted, setisGelted] = useState(false);
  const [NationalityId, setNationalityId] = useState("");
  const [PurchasePrice, setPurchasePrice] = useState("");
  const [Rds, setRds] = useState("");
  const [preview, setPreview] = useState();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("NameEn", NameEn);
      formData.append("DOB", DOB);
      formData.append("NameAr", NameAr);
      formData.append("Remarks", Remarks);
      formData.append("ActiveOwner", ActiveOwner.id);
      // formData.append("ActiveJockey", ActiveJockey.id);
      // formData.append("Owner", Owner.id);
      formData.append("HorseStatus", HorseStatus);
      // formData.append("Jockey", Jockey.id);
      // formData.append("Trainer", Trainer.id);
      // formData.append("Trainer", ActiveTrainer.id);
      formData.append("ActiveTrainer", ActiveTrainer.id);
      formData.append("Sex", Sex.id);
      formData.append("Breeder", Breeder.id);
      formData.append("ColorID", ColorID.id);
      formData.append("KindOfHorse", KindOfHorse.id);
      formData.append("Dam", Dam.id);
      formData.append("Sire", Sire.id);
      formData.append("GSire", GSire.id);
      // formData.append("WinningAmount", WinningAmount);
      // formData.append("OverAllRating", OverAllRating);
      formData.append("Foal", Foal.value);
      formData.append("Cap", Cap);
      formData.append("Rds", Rds.value);
      formData.append("STARS", STARS);
      formData.append("isGelted", isGelted.id);
      formData.append("NationalityId", NationalityId.id);
      formData.append("CreationId", NationalityId.id);
      formData.append("PurchasePrice", PurchasePrice);
      const response = await axios.post(
        `http://3.90.189.40:4000/api/v1createhorse?keyword=&page=`,
        formData
      );
      swal({
        title: "success!",
        text: "Data Submitted !",
        icon: "success",
        button: "OK",
      });
      history("/horse");
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
    // I've kept this example simple by using the first image instead of multiple
    setimage(e.target.files[0]);
  
  };
  const isSubmitData =
    // ActiveOwner === "" ||
    // Age === "" ||
    // NameEn === "" ||
    // NameAr === "" ||
    // Owner === "" ||
    // ActiveTrainer === "" ||
    // Remarks === "" ||
    // Sex === "" ||
    // Color === "" ||
    // KindOfHorse === "" ||
    // Dam === "" ||
    // Sire === "" ||
    // GSire === "" ||
    // WinningAmount === "" ||
    // OverAllRating === "" ||
    image === null || image === undefined;

  const convert = (num) => {
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
      ", " +
      date.getDate() +
      " " +
      months[date.getMonth()] +
      ", " +
      date.getFullYear();
    return delDateString;
  };

  const DateMax =   new Date();
  return (
    <Fragment>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Add Horse</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Horse Name"
                      className="mb-3"
                      onChange={(e) => setNameEn(e.target.value)}
                      name="Name"
                      value={NameEn}
                    >
                      <Form.Control type="text" placeholder=" Horse Name" />
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
                      onChange={setDOB}
                      value={DOB}
                      // minDate={DateMin}
                      maxDate={DateMax}
                      dayPlaceholder="  "
                      monthPlaceholder="Date Of Birth"
                      yearPlaceholder=""
                    />

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      type="text"
                      placeholder="Date Of Birth"
                      onChange={setDOB}
                      value={DOB}
                      style={{ direction: "rtl" }}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Foal</div>}
                      defaultValue={Foal}
                      value={Foal}
                      onChange={setFoal}
                      options={Foals}
                      className="basic-single"
                      classNamePrefix="select"
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder="تقييم الحصان"
                      className="selectdir"
                      defaultValue={Foal}
                      value={Foal}
                      onChange={setFoal}
                      options={Foals}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>

                {/* <div className="row mainrow">
                  <div className="col-sm">
                    <input
                      placeholder="Over All Rating"
                      type="number"
                      onChange={(e) => setOverAllRating(e.target.value)}
                      value={OverAllRating}
                    ></input><span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      placeholder="تقييم عام"
                      style={{ direction: "rtl" }}
                      type="number"
                    ></input>
                  </div>
                </div> */}
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
                      <Form.Control type="text" placeholder="ملاحظات" />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Horse Kind</div>}
                      defaultValue={KindOfHorse}
                      onChange={setKindOfHorse}
                      options={horsekindoptions}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={KindOfHorse}
                      onChange={setKindOfHorse}
                      options={horsekindoptions}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Horse Status</div>}
                      defaultValue={HorseStatus}
                      onChange={setHorseStatus}
                      options={HorseStatusAll}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={HorseStatus}
                      onChange={setHorseStatus}
                      options={HorseStatusAll}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="starstyle">
                    <p>Stars</p>
                    <div className="starcss">
                    <ReactStars
                      count={5}
                      onChange={setSTARS}
                      size={44}
                      a11y= {true}
                      isHalf= {true}
                      activeColor="#19469D "
                    />
                      {/* <Rating
                        fractions={2}
                        stop={5}
                        initialRating={STARS}
                        onClick={(rate) => setSTARS(rate)}
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Purchase Price"
                      className="mb-3"
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      value={PurchasePrice}
                    >
                      <Form.Control
                        type="number"
                        placeholder="Purchase Price"
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="سعر الشراء"
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      value={PurchasePrice}
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="number" placeholder="سعر الشراء" />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Rds</div>}
                      defaultValue={Rds}
                      onChange={setRds}
                      options={Gelted}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={Rds}
                      onChange={setRds}
                      options={Gelted}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Breeder</div>}
                      defaultValue={Breeder}
                      onChange={setBreeder}
                      options={AllBreeder}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <button
                          className="addmore"
                          onClick={() => history("/breeder")}
                        >
                          +
                        </button>
                      </OverlayTrigger>
                      |
                    </span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد نوع الجنس</div>}
                      className="selectdir"
                      defaultValue={Breeder}
                      onChange={setBreeder}
                      options={AllBreeder}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Color</div>}
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
                        <button
                          className="addmore"
                          onClick={() => history("/color")}
                        >
                          +
                        </button>
                      </OverlayTrigger>
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
                      options={AllColor}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Gender</div>}
                      defaultValue={Sex}
                      onChange={setSex}
                      options={AllGender}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <button
                          className="addmore"
                          onClick={() => history("/gender")}
                        >
                          +
                        </button>
                      </OverlayTrigger>
                      |
                    </span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد نوع الجنس</div>}
                      className="selectdir"
                      defaultValue={Sex}
                      onChange={setSex}
                      options={Gender}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search Sire</div>}
                      defaultValue={Sire}
                      onChange={setSire}
                      options={horseoptions}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>اكتب للبحث عن مواليد</div>}
                      defaultValue={Sire}
                      onChange={setSire}
                      className="selectdir"
                      options={horseoptions}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search Dam</div>}
                      defaultValue={Dam}
                      onChange={setDam}
                      options={horseoptions}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>اكتب للبحث عن السد</div>}
                      defaultValue={Dam}
                      onChange={setDam}
                      options={horseoptions}
                      className="selectdir"
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search GSire</div>}
                      defaultValue={GSire}
                      onChange={setGSire}
                      options={horseoptions}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>اكتب للبحث عن مواليد</div>}
                      defaultValue={GSire}
                      onChange={setGSire}
                      options={horseoptions}
                      className="selectdir"
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search Owner</div>}
                      defaultValue={Owner}
                      onChange={setOwner}
                      options={owneroption}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <button
                          className="addmore"
                          onClick={() => history("/ownerform")}
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
                      placeholder={<div>اكتب للبحث عن المالك</div>}
                      defaultValue={Owner}
                      onChange={setOwner}
                      options={owneroption}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search Active Owner</div>}
                      defaultValue={ActiveOwner}
                      onChange={setActiveOwner}
                      options={owneroption}
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
          <button className="addmore" onClick={()=> history('/ownerform')}>+</button>
        </OverlayTrigger> 

                       |</span>
                  </div>

                  <div className="col-sm">
                    <Select         className='selectdir'
                      placeholder={
                        <div style={{ direction: "rtl" }}>
                         اكتب للبحث عن المالك النشط
                        </div>
                      }
                      defaultValue={ActiveOwner}
                      onChange={setActiveOwner}
                      options={owneroption}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>              
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Gelted</div>}
                      defaultValue={isGelted}
                      onChange={setisGelted}
                      options={Gelted}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={isGelted}
                      onChange={setisGelted}
                      options={Gelted}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
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
                    <Select
                      placeholder={<div>Creation Id</div>}
                      defaultValue={CreationId}
                      onChange={setCreationId}
                      options={AllNationality}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <Select
                      className="selectdir"
                      placeholder={
                        <div style={{ direction: "rtl" }}>
                          اكتب للبحث عن الجنسية
                        </div>
                      }
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
                    <Select
                      placeholder={<div>Type to search Active trainer</div>}
                      defaultValue={ActiveTrainer}
                      onChange={setActiveTrainer}
                      options={traineroption}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <button
                          className="addmore"
                          onClick={() => history("/trainerform")}
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
                          اكتب للبحث عن المدرب النشط
                        </div>
                      }
                      defaultValue={ActiveTrainer}
                      onChange={setActiveTrainer}
                      options={traineroption}
                      isClearable={true}
                      isSearchable={true}
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
                      <img src={preview} alt="" className="PreviewImage" />
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitData}
                    className="SubmitButton"
                  >
                    Add Horse
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

export default HorseForm;
