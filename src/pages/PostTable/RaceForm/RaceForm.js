import React, { useEffect } from "react";
import { add } from "../../../redux/postReducer/postRace";
import Moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { fetchjockey } from "../../../redux/getReducer/getJockeySlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchracecourse } from "../../../redux/getReducer/getRaceCourseSlice";
import { fetchSponsor } from "../../../redux/getReducer/getSponsorSlice";
import { fetchMeeting } from "../../../redux/getReducer/getMeeting";
import { fetchRaceType } from "../../../redux/getReducer/getRacetype";
import { fetchRaceName } from "../../../redux/getReducer/getRaceName";
import { fetchTrackLength } from "../../../redux/getReducer/getTracklength";
import { fetchRaceKind } from "../../../redux/getReducer/getRaceKind";
import Select from "react-select";
import swal from "sweetalert";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { AiOutlineReload } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import Racename from "../Racenameform";
import MeetingTypePopUp from "../MeetingType";
import RaceTypePopup from '../Racetypeform'
import TrackLengthPopup from '../Tracklengthform'

// const RaceKinds = [
//   { id: "1", value: "Flat", label: "Flat" },
//   { id: "2", value: "Turf", label: "Turf" },
// ];
const WeatherTypes = [
  { id: "1", value: "Sunny", label: "Sunny" },
  { id: "2", value: "Cloudy", label: "Cloudy" },
];
const RaceStatuss = [
  { id: "1", value: "Cancel", label: "Cancel" },
  { id: "2", value: "Due", label: "Due" },
  { id: "2", value: "Live", label: "Live" },
  { id: "2", value: "End", label: "End" },
];
const GroundTypes = [
  { id: "1", value: "Green", label: "Green" },
  { id: "2", value: "Flat", label: "Flat" },
];

const RaceForm = () => {
  const { data: racecourse } = useSelector((state) => state.racecourse);
  const { data: jockey } = useSelector((state) => state.jockey);
  const { data: sponsor } = useSelector((state) => state.sponsor);
  const { data: meeting } = useSelector((state) => state.meeting);
  const { data: RaceType } = useSelector((state) => state.RaceType);
  const { data: RaceName } = useSelector((state) => state.RaceName);
  const { data: trackLength } = useSelector((state) => state.trackLength);
  const { data: raceKinds, status } = useSelector((state) => state.raceKinds);

  const history = useNavigate();
  const dispatch = useDispatch();

  let racecourses =
    racecourse === undefined ? (
      <></>
    ) : (
      racecourse.map(function (item) {
        return {
          id: item._id,
          value: item.TrackNameEn,
          label: item.TrackNameEn,
        };
      })
    );

  let JockeyForTheRace =
    jockey === undefined ? (
      <></>
    ) : (
      jockey.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );

  let Racenameoptions =
    RaceName === undefined ? (
      <></>
    ) : (
      RaceName.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
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

  let MeetingTypes =
    meeting === undefined ? (
      <></>
    ) : (
      meeting.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );

  let RaceTypes =
    RaceType === undefined ? (
      <></>
    ) : (
      RaceType.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );

  let TrackLenght =
    trackLength === undefined ? (
      <></>
    ) : (
      trackLength.map(function (item) {
        return {
          id: item._id,
          value: item.TrackLength,
          label: item.TrackLength,
        };
      })
    );

  let OprtionRaceKind =
    raceKinds === undefined ? (
      <></>
    ) : (
      raceKinds.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );

  const [showName, setShowName] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showRaceType, setShowRaceType] = useState(false);
  const [showTrackLength, setShowTrackLength] = useState(false);

  const handleCloseTrackLength = () => setShowName(false);
  const handleCloseName = () => setShowName(false);
  const handleCloseType = () => setShowType(false);
  const handleCloseRaceType = () => setShowRaceType(false);

  const handleShowTrackLength = async () => {
    await setTrackLength(true);
  };

  const handleShowName = async () => {
    await setShowName(true);
  };
  const handleShowType = async () => {
    await setShowType(true);
  };

  const handleShowRaceType = async () => {
    await setShowRaceType(true);
  };

  const FetchNew = () => {
    dispatch(fetchracecourse());
    dispatch(fetchjockey());
    dispatch(fetchSponsor());
    dispatch(fetchMeeting());
    dispatch(fetchRaceType());
    dispatch(fetchRaceName());
    dispatch(fetchTrackLength());
    dispatch(fetchRaceKind());
  };

  const [MeetingType, setMeetingType] = useState("");
  const [RaceNameEn, setRaceNameEn] = useState("");
  const [MeetingCode, setMeetingCode] = useState("");
  const [Ground, setGround] = useState("");
  const [RaceNameAr, setRaceNameAr] = useState("");
  const [RaceKind, setRaceKind] = useState("");
  const [DescriptionEn, setDescriptionEn] = useState("");
  const [DescriptionAr, setDescriptionAr] = useState("");
  const [DayNTime, setDayNTime] = useState("");
  const [WeatherType, setWeatherType] = useState("");
  const [RaceStatus, setRaceStatus] = useState("");
  const [RaceCourse, setRaceCourse] = useState("");
  const [WeatherIcon, setWeatherIcon] = useState("");
  const [WeatherDegree, setWeatherDegree] = useState("");
  const [Sponsor, setSponsor] = useState("");
  const [TrackLength, setTrackLength] = useState("");
  const [ActiveJockeyForTheRace, setActiveJockeyForTheRace] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [RaceTyp, setRaceType] = useState("");
  const [FirstPrice, setFirstPrice] = useState("");
  const [SecondPrice, setSecondPrice] = useState("");
  const [ThirdPrice, setThirdPrice] = useState("");
  const [FourthPrice, setFourthPrice] = useState("");
  const [FifthPrice, setFifthPrice] = useState("");
  const [SixthPrice, setSixthPrice] = useState("");

  var today = new Date();

  useEffect(() => {
    dispatch(fetchracecourse());
    dispatch(fetchjockey());
    dispatch(fetchSponsor());
    dispatch(fetchMeeting());
    dispatch(fetchRaceType());
    dispatch(fetchRaceName());
    dispatch(fetchTrackLength());
    dispatch(fetchRaceKind());
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image, dispatch]);

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("RaceName", RaceNameEn.id);
      formData.append("MeetingType", MeetingType.id);
      formData.append("MeetingCode", MeetingCode);
      formData.append("Ground", Ground.id);
      formData.append("RaceNameAr", RaceNameAr);
      formData.append("RaceType", RaceTyp.id);
      formData.append("RaceKind", RaceKind.id);
      formData.append("DescriptionEn", DescriptionEn);
      formData.append("DescriptionAr", DescriptionAr);
      formData.append("DayNTime", DayNTime);
      formData.append("WeatherType", WeatherType.value);
      formData.append("RaceStatus", RaceStatus.value);
      formData.append("RaceCourse", RaceCourse.id);
      formData.append("WeatherIcon", WeatherIcon);
      formData.append("FirstPrice", FirstPrice);
      formData.append("SecondPrice", SecondPrice);
      formData.append("ThirdPrice", ThirdPrice);
      formData.append("FourthPrice", FourthPrice);
      formData.append("FifthPrice", FifthPrice);
      formData.append("SixthPrice", SixthPrice);
      formData.append("Sponsor", Sponsor.id);
      formData.append("WeatherDegree", WeatherDegree);
      formData.append("TrackLength", TrackLength.id);
      formData.append("ActiveJockeyForTheRace", ActiveJockeyForTheRace.id);
      formData.append("image", image);
      const response = await axios.post(
        `http://3.90.189.40:4000/api/v1/createrace`,
        formData
      );
      swal({
        title: "success!",
        text: "Data Submitted !",
        icon: "success",
        button: "OK",
      });
      const RaceId = response.data.data._id;
      history("/publishrace", {
        state: {
          RaceId: RaceId,
        },
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

  const isSubmitData =
    RaceKind === "" ||
    RaceNameEn === "" ||
    DescriptionEn === "" ||
    DayNTime === "" ||
    WeatherType === "" ||
    RaceStatus === "" ||
    RaceCourse === "";

  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
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
            <div className="Headers">Add Race</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Meeting Type</div>}
                      defaultValue={MeetingType}
                      onChange={setMeetingType}
                      options={MeetingTypes}
                      isClearable={true}
                      isSearchable={true}
                    />{" "}
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <>
                          <button className="addmore" onClick={handleShowType}>
                            +
                          </button>
                        </>
                      </OverlayTrigger>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id={`tooltip-top`}>Fetch New</Tooltip>
                        }
                      >
                        <>
                          {/* <button className="addmore" onClick={handleShow}>+</button> */}
                          <button className="addmore" onClick={FetchNew}>
                            <AiOutlineReload />
                          </button>
                        </>
                      </OverlayTrigger>{" "}
                      |
                    </span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>طقس</div>}
                      defaultValue={MeetingType}
                      className="selectdir"
                      options={MeetingTypes}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                <div className="col-sm">
                    <Select
                      placeholder={<div>Race Name</div>}
                      defaultValue={RaceName}
                      onChange={setRaceNameEn}
                      options={Racenameoptions}
                      isClearable={true}
                      isSearchable={true}
                    />{" "}
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <>
                          <button className="addmore" onClick={handleShowName}>
                            +
                          </button>
                        </>
                      </OverlayTrigger>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id={`tooltip-top`}>Fetch New</Tooltip>
                        }
                      >
                        <>
                          {/* <button className="addmore" onClick={handleShow}>+</button> */}
                          <button className="addmore" onClick={FetchNew}>
                            <AiOutlineReload />
                          </button>
                        </>
                      </OverlayTrigger>{" "}
                      |
                    </span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>طقس</div>}
                      className="selectdir"
                      defaultValue={RaceNameEn}
                      onChange={setRaceNameEn}
                      options={Racenameoptions}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row  mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Meeting Code"
                      className="mb-3"
                      onChange={(e) => setMeetingCode(e.target.value)}
                      value={MeetingCode}
                    >
                      <Form.Control type="text" placeholder="Meeting Code" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="رمز الاجتماع"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="text" placeholder="رمز الاجتماع" />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row  mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Description"
                      className="mb-3"
                      onChange={(e) => setDescriptionEn(e.target.value)}
                      value={DescriptionEn}
                    >
                      <Form.Control type="text" placeholder="Description" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label=" وصف"
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setDescriptionAr(e.target.value)}
                      value={DescriptionAr}
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="text" placeholder=" وصف" />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row  mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Weather Icon"
                      className="mb-3"
                      onChange={(e) => setWeatherIcon(e.target.value)}
                      value={WeatherIcon}
                    >
                      <Form.Control type="text" placeholder="Weather Icon" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label=" رمز الطقس"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="text" placeholder=" رمز الطقس" />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row  mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Weather Degree"
                      className="mb-3"
                      onChange={(e) => setWeatherDegree(e.target.value)}
                      value={WeatherDegree}
                    >
                      <Form.Control
                        type="number"
                        placeholder="Weather Degree"
                      />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="درجة الطقس "
                      onChange={(e) => setWeatherDegree(e.target.value)}
                      value={WeatherDegree}
                      type="number"
                      required
                    ></input>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Race Type</div>}
                      defaultValue={RaceType}
                      onChange={setRaceType}
                      options={RaceTypes}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <>
                          <button className="addmore" onClick={handleShowType}>
                            +
                          </button>
                        </>
                      </OverlayTrigger>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id={`tooltip-top`}>Fetch New</Tooltip>
                        }
                      >
                        <>
                          <button className="addmore" onClick={FetchNew}>
                            <AiOutlineReload />
                          </button>
                        </>
                      </OverlayTrigger>{" "}
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
                      defaultValue={RaceType}
                      onChange={setRaceType}
                      options={RaceTypes}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Track Length</div>}
                      defaultValue={TrackLength}
                      onChange={setTrackLength}
                      options={TrackLenght}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                       
                      >
                        <button
                          className="addmore" 
                          onClick={() => history("/tracklengthform")}
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
                      defaultValue={TrackLength}
                      onChange={setTrackLength}
                      options={GroundTypes}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Ground type</div>}
                      defaultValue={Ground}
                      onChange={setGround}
                      options={GroundTypes}
                      isClearable={true}
                      isSearchable={true}
                    />{" "}
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>طقس</div>}
                      className="selectdir"
                      options={GroundTypes}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>RaceKind</div>}
                      defaultValue={RaceKind}
                      onChange={setRaceKind}
                      options={OprtionRaceKind}
                      isClearable={true}
                      isSearchable={true}
                    />{" "}
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>نوع السباق</div>}
                      defaultValue={RaceKind}
                      className="selectdir"
                      onChange={setRaceKind}
                      options={OprtionRaceKind}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>WeatherType</div>}
                      defaultValue={WeatherType}
                      onChange={setWeatherType}
                      options={WeatherTypes}
                      isClearable={true}
                      isSearchable={true}
                    />{" "}
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>طقس</div>}
                      className="selectdir"
                      options={WeatherTypes}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Race Course</div>}
                      defaultValue={RaceCourse}
                      onChange={setRaceCourse}
                      options={racecourses}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <button
                          className="addmore"
                          onClick={() => history("/racecourseform")}
                        >
                          +
                        </button>
                      </OverlayTrigger>
                      |
                    </span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>دورة السباق</div>}
                      className="selectdir"
                      options={racecourses}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Active Jockey For The Race</div>}
                      defaultValue={ActiveJockeyForTheRace}
                      onChange={setActiveJockeyForTheRace}
                      options={JockeyForTheRace}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <button
                          className="addmore"
                          onClick={() => history("/jockeyform")}
                        >
                          +
                        </button>
                      </OverlayTrigger>
                      |
                    </span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>دورة السباق</div>}
                      className="selectdir"
                      defaultValue={ActiveJockeyForTheRace}
                      onChange={ActiveJockeyForTheRace}
                      options={JockeyForTheRace}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Race Status</div>}
                      defaultValue={RaceStatus}
                      onChange={setRaceStatus}
                      options={RaceStatuss}
                      isClearable={true}
                      isSearchable={true}
                    />{" "}
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>حالة السباق</div>}
                      className="selectdir"
                      options={RaceStatuss}
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
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <button
                          className="addmore"
                          onClick={() => history("/sponsorform")}
                        >
                          +
                        </button>
                      </OverlayTrigger>
                      |
                    </span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>نوع السباق</div>}
                      defaultValue={Sponsor}
                      onChange={setSponsor}
                      options={SponsorForTheRaceAr}
                      className="selectdir"
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Enter Cap"
                      className="mb-3"
                    >
                      <Form.Control type="text" placeholder="Enter Cap" />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="أدخل كاب"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="text" placeholder=" أدخل كاب" />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <DateTimePicker
                      onChange={setDayNTime}
                      value={DayNTime}
                      monthPlaceholder="Date "
                      dayPlaceholder="&"
                      minDate={today}
                      maxDate={new Date("02-29-2023")}
                      yearPlaceholder="Time"
                    />
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <DateTimePicker
                      onChange={setDayNTime}
                      value={DayNTime}
                      monthPlaceholder="Date "
                      dayPlaceholder="&"
                      yearPlaceholder="Time"
                      style={{ direction: "rtl" }}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Enter 1st Prize"
                      className="mb-3"
                      onChange={(e) => setFirstPrice(e.target.value)}
                      value={FirstPrice}
                     
                    >
                      <Form.Control  type="number" placeholder="Enter 1st Prize" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="الجائزة الأولى "
                      value={FirstPrice}
                      onChange={(e) => setFirstPrice(e.target.value)}
                     
                    ></input>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Enter 2nd Prize"
                      className="mb-3"
                      onChange={(e) => setSecondPrice(e.target.value)}
                      value={SecondPrice}
                     
                    >
                      <Form.Control  type="number" placeholder="Enter 2nd Prize" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="الجائزة الثانية "
                      value={SecondPrice}
                      onChange={(e) => setSecondPrice(e.target.value)}
                     
                    ></input>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Enter 3rd Prize"
                      className="mb-3"
                      onChange={(e) => setThirdPrice(e.target.value)}
                      value={ThirdPrice}
                     
                    >
                      <Form.Control  type="number" placeholder="Enter 3rd Prize" />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <input
                      placeholder="الجائزة الثالثة"
                      style={{ direction: "rtl" }}
                      onChange={(e) => setThirdPrice(e.target.value)}
                      value={ThirdPrice}
                     
                    ></input>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Enter 4th Prize"
                      className="mb-3"
                      onChange={(e) => setFourthPrice(e.target.value)}
                      value={FourthPrice}
                     
                    >
                      <Form.Control  type="number" placeholder="Enter 4th Prize" />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="الجائزة الرابعة "
                      onChange={(e) => setFourthPrice(e.target.value)}
                      value={FourthPrice}
                     
                    ></input>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Enter 5th Prize"
                      className="mb-3"
                      onChange={(e) => setFifthPrice(e.target.value)}
                      value={FifthPrice}
                     
                    >
                      <Form.Control  type="number" placeholder="Enter 5th Prize" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="الجائزة الخامسة "
                      onChange={(e) => setFifthPrice(e.target.value)}
                      value={FifthPrice}
                     
                    ></input>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Enter 6th Prize"
                      className="mb-3"
                      onChange={(e) => setSixthPrice(e.target.value)}
                      value={SixthPrice}
                     
                    >
                      <Form.Control  type="number" placeholder="Enter 6th Prize" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="الجائزة السادسة"
                      onChange={(e) => setSixthPrice(e.target.value)}
                      value={SixthPrice}
                     
                    ></input>
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

                  <button type="submit" className="SubmitButton">
                    Save & Add Horses
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showName}
        onHide={handleCloseName}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Race Name</h2>
        </Modal.Header>
        <Modal.Body>
          <Racename />
        </Modal.Body>
      </Modal>
      <Modal
        show={showType}
        onHide={handleCloseType}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Meeting Type</h2>
        </Modal.Header>
        <Modal.Body>
          <MeetingTypePopUp />
        </Modal.Body>
      </Modal>
      <Modal
        show={showRaceType}
        onHide={handleCloseRaceType}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Race Type</h2>
        </Modal.Header>
        <Modal.Body>
          <RaceTypePopup />
        </Modal.Body>
      </Modal>
      
    </>
  );
};

export default RaceForm;
