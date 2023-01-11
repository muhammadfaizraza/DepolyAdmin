import React, { Fragment, useState, useEffect } from "react";
import { fetchTrainer } from "../../redux/getReducer/getTrainerSlice";
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
import swal from "sweetalert";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import { AiOutlineReload } from "react-icons/ai";
import TextInputValidation from "../../utils/TextInputValidation";
import BreederPopup from './Breeder';
import ColorPopup from './Color';
import GenderPopup from './Gender';
import OwnerPopup from "./Owner/OwnerForm";
import TrainerPopup from "./PostTrainer";
import NationalityPopup from "./Nationality";
import HorseKindPopup from "./Horsekindform";
import { ImCross } from 'react-icons/im';

const Gelted = [
  { id: "0", value: "false", label: "false" },
  { id: "1", value: "true", label: "true" },
];


const HorseStatusAll = [
  {
    id: "0", value: "false", label: (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <p>false</p>
        <p>خاطئة</p>

      </div>
    ),
  },
  {
    id: "1", value: "true", label: (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <p>true</p>
        <p>حقيقي</p>

      </div>
    )
  },
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

  //for error
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const [ErrorRemarks, setErrorRemarks] = useState("");
  const [ErrorHeight, setErrorHeight] = useState("");
  const [ErrorRds, setErrorRds] = useState("");
  const [ErrorHorseKind, setErrorHorseKind] = useState("");
  const [ErrorHorseStatus, setErrorHorseStatus] = useState("");
  const [ErrorPurchase, setErrorPurchase] = useState("");
  const [ErrorFoal, setErrorFoal] = useState("");
  const [ErrorBreeder, setErrorBreeder] = useState("");
  const [ErrorColor, setErrorColor] = useState("");
  const [ErrorGender, setErrorGender] = useState("");

  const [ErrorOwner, setErrorOwner] = useState("");
  const [ErrorTrainer, setErrorTrainer] = useState("");
  const [ErrorGelded, setErrorGelded] = useState("");
  const [ErrorNationality, setErrorNationality] = useState("");
  const [ErrorCreationid, setErrorCreationid] = useState("");
  const [ErrorRemarksAr, setErrorRemarksAr] = useState("");

  const [ErrorRegistration, setErrorRegistration] = useState("");
  const [SearchAge, setSearchAge] = useState('');
  const [SearchCode, setSearchCode] = useState('');
  const [SearchTitle, setSearchTitle] = useState('');
  const [SearchStartDate, setSearchStartDate] = useState('');
  const [SearchEndStart, setSearchEndStart] = useState('');


  const dispatch = useDispatch();
  const history = useNavigate();

  const { data: trainer } = useSelector((state) => state.trainer);
  const { data: owner } = useSelector((state) => state.owner);
  const { data: horse } = useSelector((state) => state.horse);
  const { data: color } = useSelector((state) => state.color);
  const { data: breeder } = useSelector((state) => state.breeder);
  const { data: nationality } = useSelector((state) => state.nationality);
  const { data: gender } = useSelector((state) => state.gender);
  const { data: HorseKind } = useSelector((state) => state.HorseKind);

  useEffect(() => {
    dispatch(fetchOwner({ SearchTitle, SearchCode, SearchAge }));
    dispatch(fetchTrainer({ SearchTitle, SearchCode, SearchAge }));
    dispatch(fetchHorse({ SearchTitle, SearchCode, SearchAge }));
    dispatch(fetchcolor({ SearchTitle, SearchCode, SearchAge }));
    dispatch(fetchbreeder({ SearchTitle, SearchCode, SearchAge, SearchStartDate, SearchEndStart }));
    dispatch(fetchnationality({ SearchTitle, SearchCode, SearchAge }));
    dispatch(fetchgender({ SearchTitle, SearchCode, SearchAge }));
    dispatch(fetchHorseKind({ SearchTitle, SearchCode, SearchAge }));
  }, [dispatch]);

  let horseoptions =
    horse === undefined ? (
      <></>
    ) : (
      horse.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <p>{item.NameEn}</p>
              <p>{item.NameAr}</p>

            </div>
          ),
        };
      })
    );
  // let horseoptionsAr =
  // horse === undefined ? (
  //   <></>
  // ) : (
  //   horse.map(function (item) {
  //     return {
  //       id: item._id,
  //       value: item._id,
  //       label: item.NameAr,
  //     };
  //   })
  // );
  let horsekindoptions =
    HorseKind === undefined ? (
      <></>
    ) : (
      HorseKind.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <p>{item.NameEn}</p>
              <p>{item.NameAr}</p>

            </div>
          ),
        };
      })
    );
  // let horsekindoptionsAr =
  // HorseKind === undefined ? (
  //   <></>
  // ) : (
  //   HorseKind.map(function (item) {
  //     return {
  //       id: item._id,
  //       value: item._id,
  //       label: item.NameAr,
  //     };
  //   })
  // );

  let traineroption =
    trainer === undefined ? (
      <></>
    ) : (
      trainer.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <p>{item.NameEn}</p>
              <p>{item.NameAr}</p>

            </div>
          ),
        };
      })
    );
  // let traineroptionAr =
  // trainer === undefined ? (
  //   <></>
  // ) : (
  //   trainer.map(function (item) {
  //     return {
  //       id: item._id,
  //       value: item._id,
  //       label: item.NameAr,
  //     };
  //   })
  // );

  let owneroption =
    owner === undefined ? (
      <></>
    ) : (
      owner.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <p>{item.NameEn}</p>
              <p>{item.NameAr}</p>

            </div>
          ),
        };
      })
    );

  // let owneroptionAr =
  // owner === undefined ? (
  //   <></>
  // ) : (
  //   owner.map(function (item) {
  //     return {
  //       id: item._id,
  //       value: item._id,
  //       label: item.NameAr,
  //     };
  //   })
  // );
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
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <p>{item.NameEn}</p>
              <p>{item.NameAr}</p>

            </div>
          ),
        };
      })
    );
  // let AllColorAr =
  // color === undefined ? (
  //   <></>
  // ) : (
  //   color.map(function (item) {
  //     return {
  //       id: item._id,
  //       value: item._id,
  //       label: item.NameAr,
  //     };
  //   })
  // );

  let AllBreeder =
    breeder === undefined ? (
      <></>
    ) : (
      breeder.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <p>{item.NameEn}</p>
              <p>{item.NameAr}</p>

            </div>
          ),
        };
      })
    );
  // let AllBreederAr =
  // breeder === undefined ? (
  //   <></>
  // ) : (
  //   breeder.map(function (item) {
  //     return {
  //       id: item._id,
  //       value: item._id,
  //       label: item.NameAr,
  //     };
  //   })
  // );

  let AllNationality =
    nationality === undefined ? (
      <></>
    ) : (
      nationality.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <p>{item.NameEn}</p>
              <p>{item.NameAr}</p>

            </div>
          ),
        };
      })
    );
  // let AllNationalityAr =
  // nationality === undefined ? (
  //   <></>
  // ) : (
  //   nationality.map(function (item) {
  //     return {
  //       id: item._id,
  //       value: item._id,
  //       label: item.NameAr,
  //     };
  //   })
  // );

  let AllGender =
    gender === undefined ? (
      <></>
    ) : (
      gender.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <p>{item.NameEn}</p>
              <p>{item.NameAr}</p>

            </div>
          ),
        };
      })
    );
  // let AllGenderAr =
  // gender === undefined ? (
  //   <></>
  // ) : (
  //   gender.map(function (item) {
  //     return {
  //       id: item._id,
  //       value: item._id,
  //       label: item.NameAr,
  //     };
  //   })
  // );


  // Modal functionalities End Here

  const [showBreeder, setShowBreeder] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showActiveOwner, setShowActiveOwner] = useState(false);
  const [showActiveTrainer, setShowActiveTrainer] = useState(false);
  const [showActivenationality, setShowActivenationality] = useState(false);
  const [showHorseKind, setShowHorseKind] = useState(false);
  const [isLoading, setisLoading] = useState(false);



  const handleCloseBreeder = () => setShowBreeder(false);
  const handleCloseColor = () => setShowColor(false);
  const handleCloseGender = () => setShowGender(false);
  const handleCloseActiveOwner = () => setShowActiveOwner(false);
  const handleCloseActiveTrainer = () => setShowActiveTrainer(false);
  const handleCloseActivenationality = () => setShowActivenationality(false);
  const handleCloseHorseKind = () => setShowHorseKind(false);

  const handleShowBreeder = async () => {
    await setShowBreeder(true);
  };

  const handleShowColor = async () => {
    await setShowColor(true);
  };

  const handleShowGender = async () => {
    await setShowGender(true);
  };

  const handleShowActiveOwner = async () => {
    await setShowActiveOwner(true);
  };

  const handleShowActiveTrainer = async () => {
    await setShowActiveTrainer(true);
  };

  const handleShowActivenationality = async () => {
    await setShowActivenationality(true);
  };

  const handleShowHorseKind = async () => {
    await setShowHorseKind(true);
  };


  const FetchNew = () => {
    dispatch(fetchOwner({ SearchTitle, SearchCode, SearchAge }));
    dispatch(fetchTrainer({ SearchTitle, SearchCode, SearchAge }));
    dispatch(fetchHorse({ SearchTitle, SearchCode, SearchAge }));
    dispatch(fetchcolor({ SearchTitle, SearchCode, SearchAge }));
    dispatch(fetchbreeder({ SearchTitle, SearchCode, SearchAge, SearchStartDate, SearchEndStart }));
    dispatch(fetchnationality({ SearchTitle, SearchCode, SearchAge }));
    dispatch(fetchgender({ SearchTitle, SearchCode, SearchAge }));
    dispatch(fetchHorseKind({ SearchTitle, SearchCode, SearchAge }));

  };
  // Modal functionalities End Here

  const [ActiveOwner, setActiveOwner] = useState("");

  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [Owner, setOwner] = useState("");
  const [ActiveTrainer, setActiveTrainer] = useState("");
  const [Breeder, setBreeder] = useState("");
  const [RemarksEn, setRemarksEn] = useState("");
  const [RemarksAr, setRemarksAr] = useState("");
  const [HorseStatus, setHorseStatus] = useState("");
  const [Sex, setSex] = useState("");
  const [ColorID, setColor] = useState("");


  const [Dam, setDam] = useState("");
  const [Sire, setSire] = useState("");
  const [DOB, setDOB] = useState("");
  const [CreationId, setCreationId] = useState("");
  const [GSire, setGSire] = useState("");
  const [OverAllRating, setOverAllRating] = useState("");
  const [image, setimage] = useState();
  const [Foal, setFoal] = useState("");

  const [STARS, setSTARS] = useState(0);
  const [isGelted, setisGelted] = useState(false);
  const [NationalityId, setNationalityId] = useState("");
  const [PurchasePrice, setPurchasePrice] = useState("");
  const [Rds, setRds] = useState("");
  const [KindHorse, setKindHorse] = useState("");
  const [Height, setHeight] = useState("");
  const [preview, setPreview] = useState();


  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("NameEn", NameEn);
      formData.append("DOB", DOB);
      formData.append("Height", Height)

      formData.append("NameAr", NameAr + ' ');
      formData.append("RemarksEn", RemarksEn);
      formData.append("RemarksAr", RemarksAr);
      formData.append("ActiveOwner", ActiveOwner.id);
      // formData.append("ActiveJockey", ActiveJockey.id);
      // formData.append("Owner", Owner.id);
      formData.append("HorseStatus", HorseStatus.value);
      formData.append("ActiveTrainer", ActiveTrainer.id);
      formData.append("Sex", Sex.id);
      formData.append("Breeder", Breeder.id);
      formData.append("ColorID", ColorID.id);
      formData.append("KindHorse", KindHorse.id);
      formData.append("Dam", Dam === '' ? '' : Dam.id);
      formData.append("Sire", Sire === '' ? '' : Sire.id);
      formData.append("GSire", GSire === '' ? '' : GSire.id);
      // formData.append("WinningAmount", WinningAmount);
      // formData.append("OverAllRating", OverAllRating);
      formData.append("Foal", Foal.value);

      formData.append("Rds", Rds.value);
      formData.append("STARS", STARS);
      formData.append("isGelded", isGelted.id);
      formData.append("NationalityID", NationalityId.id);
      formData.append("CreationId", NationalityId.id);
      formData.append("PurchasePrice", PurchasePrice);
      const response = await axios.post(
        `${window.env.API_URL}createhorse?keyword=&page=`,
        formData
      );
      setisLoading(false)

      swal({
        title: "Success!",
        text: "Data has been added Successfully",
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
      setisLoading(false)
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
    setimage(e.target.files[0]);

  };
  const handlePreview = () => {
    setimage()
    document.getElementById("file").value = ""
  };

  var today = new Date();


  const data1 = JSON.stringify(
    TextInputValidation("en", NameEn, "Horse English Name ")
  );
  const obj = JSON.parse(data1);

  const data2 = JSON.stringify(
    TextInputValidation("ar", NameAr, "Horse Arabic Name ")
  );
  const objAr = JSON.parse(data2);


  const data3 = JSON.stringify(
    TextInputValidation("en", RemarksEn, "Horse Remarks English ")
  );
  const remark = JSON.parse(data3);

  const data4 = JSON.stringify(
    TextInputValidation("ar", RemarksAr, "Horse Remarks Arabic  ")
  );
  const remarkar = JSON.parse(data4);

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
                      onBlur={() => setError(obj)}
                    >
                      <Form.Control type="text" placeholder=" Horse Name" required />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                    <span className={Error.status ? "success" : "error"}>{Error.message}</span>
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
                      <Form.Control type="text" placeholder="اسم" required />
                    </FloatingLabel>
                    <span className={ErrorAr.status ? "successAr" : "errorAr"}>{ErrorAr.message}</span>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <DatePicker
                      onChange={setDOB}
                      value={DOB}
                      dayPlaceholder=""
                      maxDate={today}
                      monthPlaceholder="Date of Birth"
                      yearPlaceholder=""
                      onBlur={() =>
                        DOB === ""
                          ? setErrorRegistration(
                            "Horse Date of Birth is required"
                          )
                          : setErrorRegistration("Horse Date of Birth is Validated")
                      }
                    />
                    <span className="spanForm"> |</span>
                    <span className={DOB === "" ? "error" : "success"}>{ErrorRegistration}</span>
                  </div>

                  <div className="col-sm" style={{ direction: "rtl" }}>
                    <DatePicker
                      onChange={setDOB}
                      value={DOB}
                      dayPlaceholder=""
                      maxDate={today}
                      monthPlaceholder="تاريخ الولادة"
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
                      placeholder={<div>Select Foal</div>}
                      defaultValue={Foal}
                      value={Foal}
                      onChange={setFoal}
                      options={Foals}
                      className="basic-single"
                      classNamePrefix="select"
                      isClearable={true}
                      isSearchable={true}
                      onBlur={(e) => Foal === "" ? setErrorFoal("Foal is required ") : setErrorFoal("Foal is Validated ")}
                    />
                    <span className="spanForm"> |</span>
                    <span className={Foal === "" ? "error" : "success"}>{ErrorFoal}</span>
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
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Remarks"
                      className="mb-3"
                      onChange={(e) => setRemarksEn(e.target.value)}
                      value={RemarksEn}
                      required
                      onBlur={() => setErrorRemarks(remark)}

                    >
                      <Form.Control type="text" placeholder="Details" />
                    </FloatingLabel>
                    <span className={ErrorRemarks.status ? "success" : "error"}>{ErrorRemarks.message}</span>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      onChange={(e) => setRemarksAr(e.target.value)}
                      value={RemarksAr}
                      label="ملاحظة"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onBlur={() => setErrorRemarksAr(remarkar)}
                    >
                      <Form.Control type="text" placeholder="ملاحظات" />
                    </FloatingLabel>
                    <span className={ErrorRemarksAr.status ? "successAr" : "errorAr"}>{ErrorRemarksAr.message}</span>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Height"
                      className="mb-3"
                      onChange={(e) => setHeight(e.target.value)}
                      name="Name"
                      value={Height}
                      onBlur={() => Height === "" ? setErrorHeight("Horse Height is required ") : setErrorHeight("Horse Height is Validated ")}

                    >
                      <Form.Control type="number" placeholder="Height" required />
                    </FloatingLabel>
                    <span className={Height === "" ? "error" : "success"}>{ErrorHeight}</span>

                  </div>


                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Horse Kind</div>}
                      defaultValue={KindHorse}
                      onChange={setKindHorse}
                      options={horsekindoptions}
                      isClearable={true}
                      isSearchable={true}
                      onBlur={() => setKindHorse === "" ? setErrorHorseKind("Horse Kind is required ") : setErrorHorseKind("Horse Kind is Validated ")}

                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore" onClick={handleShowHorseKind}>
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

                    </span>
                    <span className={KindHorse === "" ? "error" : "success"}>{ErrorHorseKind}</span>
                  </div>
                  {/* <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={KindHorse}
                      onChange={setKindHorse}
                      options={horsekindoptionsAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div> */}
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
                      onBlur={() => HorseStatus === "" ? setErrorHorseStatus("Horse Status is required ") : setErrorHorseStatus("Horse Status is Validated")}


                    />
                    <span className={HorseStatus === "" ? "error" : "success"}>{ErrorHorseStatus}</span>
                  </div>
                  {/* <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={HorseStatus}
                      onChange={setHorseStatus}
                      options={HorseStatusAllAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="starstyle">
                    <p>Stars</p>
                    <div className="starcss">
                      <ReactStars
                        count={5}
                        onChange={setSTARS}
                        size={44}
                        a11y={true}
                        isHalf={true}
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
                      onBlur={() => PurchasePrice === "" ? setErrorPurchase("Horse Purchase Price is required ") : setErrorPurchase("Horse Purchase Price is Validated  ")}

                    >
                      <Form.Control
                        type="number"
                        min='0'
                        placeholder="Purchase Price"
                        required
                      />
                    </FloatingLabel>
                    <span className={PurchasePrice === "" ? "error" : "success"}>{ErrorPurchase}</span>

                    {/* <span className="spanForm"> |</span> */}
                  </div>
                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="سعر الشراء"
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      value={PurchasePrice}
                      min='0'
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="number" placeholder="سعر الشراء" />
                    </FloatingLabel>
                  </div> */}
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
                      onBlur={() => Rds === "" ? setErrorRds("Horse Rds is required ") : setErrorRds("Horse Rds is Validated")}

                    />
                    {/* <span className="spanForm"> |</span> */}
                    <span className={Rds === "" ? "error" : "success"}>{ErrorRds}</span>
                  </div>
                  {/* <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={Rds}
                      onChange={setRds}
                      options={GeltedAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div> */}
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
                      onBlur={() => Breeder === "" ? setErrorBreeder("Horse Breeder is required ") : setErrorBreeder(" Horse Breeder is Validated")}

                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore" onClick={handleShowBreeder}>
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

                    </span>
                    <span className={Breeder === "" ? "error" : "success"}>{ErrorBreeder}</span>
                  </div>
                  {/* <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد نوع الجنس</div>}
                      className="selectdir"
                      defaultValue={Breeder}
                      onChange={setBreeder}
                      options={AllBreederAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div> */}
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
                      onBlur={() => ColorID === "" ? setErrorColor("Horse Color is required ") : setErrorColor("Horse Color is Validated")}

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

                    </span>
                    <span className={ColorID === "" ? "error" : "success"}>{ErrorColor}</span>
                  </div>
                  {/* <div className="col-sm">
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
                  </div> */}
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
                      onBlur={() => Sex === "" ? setErrorGender("Horse Gender is required ") : setErrorGender("Horse Gender is Validated ")}


                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore" onClick={handleShowGender}>
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

                    </span>
                    <span className={Sex === "" ? "error" : "success"}>{ErrorGender}</span>
                  </div>
                  {/* <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد نوع الجنس</div>}
                      className="selectdir"
                      defaultValue={Sex}
                      onChange={setSex}
                      options={AllGenderAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div> */}
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
                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <Select
                      placeholder={<div>اكتب للبحث عن مواليد</div>}
                      defaultValue={Sire}
                      onChange={setSire}
                      className="selectdir"
                      options={horseoptionsAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div> */}
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
                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <Select
                      placeholder={<div>اكتب للبحث عن السد</div>}
                      defaultValue={Dam}
                      onChange={setDam}
                      options={horseoptionsAr}
                      className="selectdir"
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div> */}
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
                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <Select
                      placeholder={<div>اكتب للبحث عن مواليد</div>}
                      defaultValue={GSire}
                      onChange={setGSire}
                      options={horseoptionsAr}
                      className="selectdir"
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div> */}
                </div>
                {/* <div className="row mainrow">
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
                </div> */}
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search Active Owner</div>}
                      defaultValue={ActiveOwner}
                      onChange={setActiveOwner}
                      options={owneroption}
                      isClearable={true}
                      isSearchable={true}
                      onBlur={() => ActiveOwner === "" ? setErrorOwner("Horse Owner is required ") : setErrorOwner("Horse Owner is Validated ")}

                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore" onClick={handleShowActiveOwner}>
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

                    </span>
                    <span className={ActiveOwner === "" ? "error" : "success"}>{ErrorOwner}</span>
                  </div>

                  {/* <div className="col-sm">
                    <Select         className='selectdir'
                      placeholder={
                        <div style={{ direction: "rtl" }}>
                         اكتب للبحث عن المالك النشط
                        </div>
                      }
                      defaultValue={ActiveOwner}
                      onChange={setActiveOwner}
                      options={owneroptionAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Gelded</div>}
                      defaultValue={isGelted}
                      onChange={setisGelted}
                      options={Gelted}
                      isClearable={true}
                      isSearchable={true}
                      onBlur={() => isGelted === "" ? setErrorGelded("Gelded is required ") : setErrorGelded("Gelded is Validated")}

                    />
                    {/* <span className="spanForm"> |</span> */}
                    <span className={isGelted === "" ? "error" : "success"}>{ErrorGelded}</span>
                  </div>
                  {/* <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد جيلتي</div>}
                      className="selectdir"
                      defaultValue={isGelted}
                      onChange={setisGelted}
                      options={HorseStatusAllAr}
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
                      onBlur={() => NationalityId === "" ? setErrorNationality("Horse Nationality is required ") : setErrorNationality("Horse Nationality is Validated")}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore" onClick={handleShowActivenationality}>
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

                    </span>
                    <span className={NationalityId === "" ? "error" : "success"} >{ErrorNationality}</span>

                  </div>
                  {/* 
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
                      options={AllNationalityAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div> */}
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
                      onBlur={() => CreationId === "" ? setErrorCreationid("Horse Creation id is required ") : setErrorCreationid("Horse Creation id is Validated ")}
                    />
                    <span className={CreationId === "" ? "error" : "success"} >{ErrorCreationid}</span>


                  </div>
                  {/* 
                  <div className="col-sm">
                    <Select
                      className="selectdir"
                      placeholder={
                        <div style={{ direction: "rtl" }}>
                          اكتب للبحث عن الجنسية
                        </div>
                      }
                      efaultValue={CreationId}
                      onChange={setCreationId}
                      options={AllNationalityAr}
                      isClearable={true}
                      isSearchable={true}

                    />
                  </div> */}
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

                      onBlur={() => ActiveTrainer === "" ? setErrorTrainer("Horse Trainer is required ") : setErrorTrainer("Horse Trainer is Validated ")}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore" onClick={handleShowActiveTrainer}>
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

                    </span>
                    <span className={ActiveTrainer === "" ? "error" : "success"}>{ErrorTrainer}</span>
                  </div>
                  {/* 
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
                      options={traineroptionAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div> */}
                </div>

                <div className="ButtonSection">
                  <div>
                    <label className="Multipleownerlabel">
                      Select Horse image
                    </label>
                    <input
                      type="file"
                      onChange={onSelectFile}
                      className="formInput"
                      id="file"
                    />
                    {image && (
                      <>
                        <ImCross onClick={handlePreview} className="crossIcon" />
                        <img src={preview} className="PreviewImage" alt="" />
                      </>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
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

      <Modal
        show={showBreeder}
        onHide={handleCloseBreeder}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2> Breeder</h2>
        </Modal.Header>
        <Modal.Body>
          <BreederPopup />
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
      <Modal
        show={showActiveOwner}
        onHide={handleCloseActiveOwner}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Owner</h2>
        </Modal.Header>
        <Modal.Body>
          <OwnerPopup />
        </Modal.Body>
      </Modal>
      <Modal
        show={showActiveTrainer}
        onHide={handleCloseActiveTrainer}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Trainer</h2>
        </Modal.Header>
        <Modal.Body>
          <TrainerPopup />
        </Modal.Body>
      </Modal>
      <Modal
        show={showGender}
        onHide={handleCloseGender}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Gender</h2>
        </Modal.Header>
        <Modal.Body>
          <GenderPopup />
        </Modal.Body>
      </Modal>
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
        show={showHorseKind}
        onHide={handleCloseHorseKind}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Horse Kind</h2>
        </Modal.Header>
        <Modal.Body>
          <HorseKindPopup />
        </Modal.Body>
      </Modal>

    </Fragment>
  );
};

export default HorseForm;
