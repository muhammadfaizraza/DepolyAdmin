import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Select from "react-select";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import ReactStars from "react-rating-stars-component";
import { fetchTrainer } from "../../redux/getReducer/getTrainerSlice";
import { fetchOwner } from "../../redux/getReducer/getOwnerSlice";
import { fetchbreeder } from "../../redux/getReducer/getBreeder";
import { fetchcolor } from "../../redux/getReducer/getColor";
import { fetchnationality } from "../../redux/getReducer/getNationality";
import { fetchHorseKind } from "../../redux/getReducer/getHorseKind";
import { fetchgender } from "../../redux/getReducer/getGenderSlice";
import { AiOutlineReload } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import BreederPopup from "../PostTable/Breeder";
import ColorPopup from "../PostTable/Color";
import OwnerPopup from "../PostTable/OwnerForm";
import TrainerPopup from "../PostTable/PostTrainer";
import GenderPopup from "../PostTable/Gender";
import NationalityPopup from "../PostTable/Nationality";
import HorseKindPopup from "../PostTable/Horsekindform";

const Gelted = [
  { id: "0", value: "false", label: "false" },
  { id: "1", value: "true", label: "true" },
];

const GeltedAr = [
  { id: "0", value: "خاطئة", label: "خاطئة" },
  { id: "1", value: "حقيقي", label: "حقيقي" },
];
const HorseStatusAll = [
  { id: "0", value: "false", label: "false" },
  { id: "1", value: "true", label: "true" },
];

const HorseStatusAllAr = [
  { id: "0", value: "خاطئة", label: "خاطئة" },
  { id: "1", value: "حقيقي", label: "حقيقي" },
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

const NewsForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { state } = useLocation();

  const { data: trainer } = useSelector((state) => state.trainer);
  const { data: owner } = useSelector((state) => state.owner);
  const { data: breeder } = useSelector((state) => state.breeder);
  const { data: gender } = useSelector((state) => state.gender);
  const { data: nationality } = useSelector((state) => state.nationality);
  const { data: color } = useSelector((state) => state.color);
  const { data: HorseKind } = useSelector((state) => state.HorseKind);

  const { horseid } = state;

  console.log(horseid);
  const [Breeder, setBreeder] = useState("");
  const [ActiveTrainer, setActiveTrainer] = useState("");
  const [ActiveOwner, setActiveOwner] = useState("");
  const [Sex, setSex] = useState("");
  const [NationalityID, setNationalityID] = useState("");
  const [CreationId, setCreationId] = useState("");
  const [ColorID, setColor] = useState("");
  const [Rds, setRds] = useState("");
  const [isGelded, setisGelded] = useState("");
  const [HorseStatus, setHorseStatus] = useState("");
  const [KindHorse, setKindHorse] = useState("");

  const [showBreeder, setShowBreeder] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showActiveOwner, setShowActiveOwner] = useState(false);
  const [showActiveTrainer, setShowActiveTrainer] = useState(false);
  const [showActivenationality, setShowActivenationality] = useState(false);
  const [showHorseKind, setShowHorseKind] = useState(false);

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
    dispatch(fetchOwner());
    dispatch(fetchTrainer());
    dispatch(fetchcolor());
    dispatch(fetchbreeder());
    dispatch(fetchnationality());
    dispatch(fetchgender());
    dispatch(fetchHorseKind());
  };

  useEffect(() => {
    dispatch(fetchOwner());
    dispatch(fetchTrainer());
    dispatch(fetchbreeder());
  }, [dispatch]);

  let traineroption =
    trainer === undefined ? (
      <></>
    ) : (
      trainer.map(function (item) {
        return {
          id: item._id,
          value: item._id,
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
          value: item._id,
          label: item.NameEn,
        };
      })
    );
  let AllGenderAr =
    gender === undefined ? (
      <></>
    ) : (
      gender.map(function (item) {
        return {
          id: item._id,
          value: item._id,
          label: item.NameAr,
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
  let horsekindoptions =
    HorseKind === undefined ? (
      <></>
    ) : (
      HorseKind.map(function (item) {
        return {
          id: item._id,
          value: item._id,
          label: item.NameEn,
        };
      })
    );
  let horsekindoptionsAr =
    HorseKind === undefined ? (
      <></>
    ) : (
      HorseKind.map(function (item) {
        return {
          id: item._id,
          value: item._id,
          label: item.NameAr,
        };
      })
    );
  const [state1, setState] = useState({
    NameEn: "",
    NameAr: "",
    PurchasePrice: "",
    STARS: "",
    RemarksEn: "",
    RemarksAr: "",
    ActiveOwner: "",
    ActiveTrainer: "",
    Breeder: "",
    HorseHorseImage: "",
    Height: "",
    ColorID: "",
    NationalityID: "",
    KindHorse: "",
    CreationId: "",
    Rds:"",
    HorseStatus: "",

  });
  const [HorseImage, setHorseImage] = useState();
  const [preview, setPreview] = useState();

  const fileSelected = (event) => {
    const HorseImage = event.target.files[0];
    setHorseImage(HorseImage, HorseImage);
  };
  useEffect(() => {
    if (HorseImage === undefined) {
      setPreview(horseid.HorseImage);
      return;
    }
    const objectUrl = URL.createObjectURL(HorseImage);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [HorseImage]);

  useEffect(() => {
    if (horseid) {
      setState({
        NameEn: horseid.NameEn,
        NameAr: horseid.NameAr,
        Breeder: horseid.Breeder,
        PurchasePrice: horseid.PurchasePrice,
        STARS: horseid.STARS,
        RemarksEn: horseid.RemarksEn,
        RemarksAr: horseid.RemarksAr,
        HorseImage: horseid.HorseImage,
        isGelded: horseid.isGelded,
        Height: horseid.Height,
        ActiveTrainer: horseid.ActiveTrainer,
        ActiveOwner: horseid.ActiveOwner,
        ColorID: horseid.ColorID,
        NationalityID: horseid.NationalityID,
        KindHorse: horseid.KindHorse,
        CreationId: horseid.CreationId,
        HorseStatus: horseid.HorseStatus,
        Rds:horseid.Rds,
      });
    } else {
    }
  }, [horseid]);
  console.log(horseid.NationalityId, "done");
  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Horseimage", state1.HorseImage);
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr + " ");
      formData.append("PurchasePrice", state1.PurchasePrice);
      formData.append("STARS", state1.STARS);
      formData.append("RemarksEn", state1.RemarksEn);
      formData.append("RemarksAr", state1.RemarksAr);
      formData.append("Height", state1.Height);
      formData.append(
        "isGelded",
        isGelded.id === undefined ? state1.isGelded : isGelded.id
      );
      formData.append("Rds", Rds.id === undefined ? state1.Rds : Rds.id);
      formData.append(
        "ActiveTrainer",
        ActiveTrainer.id === undefined ? state1.ActiveTrainer : ActiveTrainer.id
      );
      formData.append(
        "Breeder",
        Breeder.id === undefined ? state1.Breeder : Breeder.id
      );
      formData.append(
        "NationalityID",
        NationalityID.id === undefined ? state1.NationalityID : NationalityID.id
      );

      formData.append(
        "ActiveOwner",
        ActiveOwner.id === undefined ? state1.ActiveOwner : ActiveOwner.id
      );
      formData.append(
        "KindHorse",
        KindHorse.id === undefined ? state1.KindHorse : KindHorse.id
      );
      formData.append(
        "HorseStatus",
        HorseStatus.id === undefined ? state1.HorseStatus : HorseStatus.id
      );
      formData.append(
        "ColorID",

        ColorID.id === undefined ? state1.ColorID : ColorID.id
      );
      formData.append(
        "CreationId",
        CreationId.id === undefined ? state1.NationalityID : NationalityID.id
      );

      const response = await axios.put(
        `${window.env.API_URL}/updatehorse/${horseid._id}`,
        formData
      );
      history("/horse");
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
            <div className="Headers">Edit Horse</div>
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
                        placeholder="Details"
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
                        placeholder="ملاحظات"
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
                        placeholder="Details"
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
                        placeholder="ملاحظات"
                        value={state1.RemarksAr}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row mainrow">
                  <p className="selectLabel">Trainer</p>
                  <div className="col-sm">
                    <Select
                      placeholder={
                        <div>{horseid.ActiveTrainerData.NameEn}</div>
                      }
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
                        <span
                          className="addmore"
                          onClick={handleShowActiveTrainer}
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

                <div className="row mainrow">
                  <p className="selectLabel">Owner</p>
                  <div className="col-sm">
                    <Select
                      placeholder={<div>{horseid.ActiveOwnerData.NameEn}</div>}
                      defaultValue={ActiveOwner}
                      onChange={setActiveOwner}
                      options={owneroption}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span
                          className="addmore"
                          onClick={handleShowActiveOwner}
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
                  </div>

                  <div className="col-sm">
                    <Select
                      className="selectdir"
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
                  <p className="selectLabel">Breeder</p>
                  <div className="col-sm">
                    <Select
                      placeholder={<div>{horseid.BreederData.NameEn}</div>}
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
                      |
                    </span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد المربي</div>}
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
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Purchased Price"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, PurchasePrice: e.target.value })
                      }
                    >
                      <Form.Control
                        type="number"
                        placeholder="Details"
                        value={state1.PurchasePrice}
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="سعر الشراء"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, Height: e.target.value })
                      }
                    >
                      <Form.Control
                        type="number"
                        placeholder="Details"
                        value={state1.PurchasePrice}
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Height"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, Height: e.target.value })
                      }
                    >
                      <Form.Control
                        type="number"
                        placeholder="Details"
                        value={state1.Height}
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="starstyle">
                    <p>Stars</p>
                    <div className="starcss">
                      <ReactStars
                        count={5}
                        onChange={(e) =>
                          setState({ ...state1, STARS: e.target.value })
                        }
                        value={state1.STARS}
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
                  <p className="selectLabel">Gender</p>
                  <div className="col-sm">
                    <Select
                      placeholder={<div>{horseid.SexModelData.NameEn}</div>}
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
                      options={AllGenderAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <p className="selectLabel">Nationality</p>
                  <div className="col-sm">
                    <Select
                      placeholder={<div>{horseid.NationalityData.NameEn}</div>}
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
                  <p className="selectLabel">Creation </p>
                  <div className="col-sm">
                    <Select
                      placeholder={<div>{horseid.CreationIdData.NameEn}</div>}
                      defaultValue={CreationId}
                      onChange={setCreationId}
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
                      className="selectdir"
                      placeholder={
                        <div style={{ direction: "rtl" }}>
                          اكتب للبحث عن الجنسية
                        </div>
                      }
                      defaultValue={CreationId}
                      onChange={setCreationId}
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
                      placeholder={<div>{horseid.ColorIDData.NameEn}</div>}
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
                <div className="row mainrow">
                  <p className="selectLabel">Gelded </p>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>{horseid.isGelded}</div>}
                      defaultValue={isGelded}
                      onChange={setisGelded}
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
                      defaultValue={isGelded}
                      onChange={setisGelded}
                      options={HorseStatusAllAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <p className="selectLabel">Rds </p>

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
                      options={GeltedAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <p className="selectLabel">Horse Status </p>

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
                      options={HorseStatusAllAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>

                <div className="row mainrow">
                  <p className="selectLabel">Horse Kind </p>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>{horseid.KindHorseData.NameEn}</div>}
                      defaultValue={KindHorse}
                      onChange={setKindHorse}
                      options={horsekindoptions}
                      isClearable={true}
                      isSearchable={true}
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
                      |
                    </span>
                  </div>
                  <div className="col-sm">
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
                  </div>
                </div>
                <div className="ButtonSection">
                  <div>
                    <input
                      type="file"
                      onChange={fileSelected}
                      className="formInput"
                    />
                    <img src={preview} className="PreviewHorseImage" alt="" />
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
    </>
  );
};

export default NewsForm;
