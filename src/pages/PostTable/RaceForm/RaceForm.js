import React, { useEffect } from "react";
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
import { fetchgroundtype } from "../../../redux/getReducer/getGroundType";
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
import GroundTypePopup from '../GroundType'
import RaceKindPopup from '../RaceKind'
import RaceCoursePopup from '../RaceCourseForm'
import JockeyPopup from '../JockeyForm'
import SponsorPopup from '../SponsorForm'

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

const RaceForm = () => {
  const { data: racecourse } = useSelector((state) => state.racecourse);
  const { data: jockey } = useSelector((state) => state.jockey);
  const { data: sponsor } = useSelector((state) => state.sponsor);
  const { data: meeting } = useSelector((state) => state.meeting);
  const { data: RaceType } = useSelector((state) => state.RaceType);
  const { data: RaceName } = useSelector((state) => state.RaceName);
  const { data: trackLength } = useSelector((state) => state.trackLength);
  const { data: raceKinds, status } = useSelector((state) => state.raceKinds);
  const { data: groundtype } = useSelector((state) => state.groundtype);

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
    console.log(MeetingTypes ,'MeetingTypes')

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

    let GroundrTypeAll =
    groundtype === undefined ? (
      <></>
    ) : (
      groundtype.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );


//  Modal functionalities Here
  const [showName, setShowName] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showRaceType, setShowRaceType] = useState(false);
  const [showTrackLength, setShowTrackLength] = useState(false);
  const [showGroundType, setShowGroundType] = useState(false);
  const [showRaceKind, setShowRaceKind] = useState(false);
  const [showRaceCourse, setShowRaceCourse] = useState(false);
  const [showJockey, setShowJockey] = useState(false);
  const [showSponsor, setShowSponsor] = useState(false);

  
  const handleCloseName = () => setShowName(false);
  const handleCloseType = () => setShowType(false);
  const handleCloseRaceType = () => setShowRaceType(false);
  const handleCloseTrackLength = () => setShowTrackLength(false);
  const handleCloseGroundType = () => setShowGroundType(false);
  const handleCloseRaceKind = () => setShowRaceKind(false);
  const handleCloseRaceCourse = () => setShowRaceCourse(false);
  const handleCloseJockey= () => setShowJockey(false);
  const handleCloseSponsor = () => setShowSponsor(false);

  const handleShowName = async () => {
    await setShowName(true);
  };
  const handleShowType = async () => {
    await setShowType(true);
  };

  const handleShowRaceType = async () => {
    await setShowRaceType(true);
  };
  const handleShowTrackLength = async () => {
    await setShowTrackLength(true);
  };

  const handleShowGroundType = async () => {
    await setShowGroundType(true);
  };

  const handleShowRaceKind = async () => {
    await setShowRaceKind(true);
  };

  const handleShowRaceCourse = async () => {
    await setShowRaceCourse(true);
  };

  const handleShowJockey = async () => {
    await setShowJockey(true);
  };

  const handleShowSponsor = async () => {
    await setShowSponsor(true);
  };

  // Modal functionalities End Here


  const FetchNew = () => {
    dispatch(fetchracecourse());
    dispatch(fetchjockey());
    dispatch(fetchSponsor());
    dispatch(fetchMeeting());
    dispatch(fetchRaceType());
    dispatch(fetchRaceName());
    dispatch(fetchTrackLength());
    dispatch(fetchRaceKind());
    dispatch(fetchgroundtype());
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
      // formData.append("RaceNameAr", RaceNameAr);
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
      // formData.append("ActiveJockeyForTheRace", ActiveJockeyForTheRace.id);
      formData.append("image", image);
      const response = await axios.post(
        `${window.env.API_URL}/createrace`,
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
                        <span className="addmore" onClick={handleShowType}>
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
                      placeholder={<div>نوع الاجتماع</div>}
                      defaultValue={MeetingType}
                      className="selectdir"
                      options={MeetingTypes}
                      onChange={setMeetingType}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                <div className="col-sm">
                    <Select
                      placeholder={<div>Race Name</div>}
                      defaultValue={RaceNameEn}
                      onChange={setRaceNameEn}
                      options={Racenameoptions}
                      isClearable={true}
                      isSearchable={true}
                    />{" "}
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore" onClick={handleShowName}>
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
                      placeholder={<div>اسم العرق</div>}
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
                    ></input>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Race Type</div>}
                      defaultValue={RaceTyp}
                      onChange={setRaceType}
                      options={RaceTypes}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                    <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                       
                      >
                        <span className="addmore" onClick={handleShowRaceType}>
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
                          اكتب للبحث عن الجنسية
                        </div>
                      }
                      defaultValue={RaceTyp}
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
                        <span className="addmore" onClick={handleShowTrackLength}>
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
                          اكتب للبحث عن الجنسية
                        </div>
                      }
                      defaultValue={TrackLength}
                      onChange={setTrackLength}
                      options={TrackLenght}
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
                      options={GroundrTypeAll}
                      isClearable={true}
                      isSearchable={true}
                    />{" "}
                   <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore" onClick={handleShowGroundType}>
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
                      placeholder={<div>طقس</div>}
                      className="selectdir"
                      options={GroundrTypeAll}
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
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore" onClick={handleShowRaceKind}>
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
                        <span className="addmore" onClick={handleShowRaceCourse}>
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
                      placeholder={<div>دورة السباق</div>}
                      className="selectdir"
                      options={racecourses}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                {/* <div className="row mainrow">
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
                        <span className="addmore" onClick={handleShowJockey}>
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
                      placeholder={<div>دورة السباق</div>}
                      className="selectdir"
                      defaultValue={ActiveJockeyForTheRace}
                      onChange={ActiveJockeyForTheRace}
                      options={JockeyForTheRace}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div> */}
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
                        <span className="addmore" onClick={handleShowSponsor}>
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
                  <div className="col-sm"  style={{ direction: "rtl" }}>
                    <DateTimePicker
                      onChange={setDayNTime}
                      value={DayNTime}
                      monthPlaceholder="Date "
                      dayPlaceholder="&"
                      minDate={today}
                      maxDate={new Date("02-29-2023")}
                      yearPlaceholder="Time"
                     
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
                      min='0'
                    >
                      <Form.Control  type="number" min='0' placeholder="Enter 1st Prize" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="الجائزة الأولى "
                      value={FirstPrice}
                      onChange={(e) => setFirstPrice(e.target.value)}
                      type='number'
                      min='0'
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
                      <Form.Control  type="number" min='0' placeholder="Enter 2nd Prize" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="الجائزة الثانية "
                      value={SecondPrice}
                      onChange={(e) => setSecondPrice(e.target.value)}
                      type='number'
                      min='0'
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
                      <Form.Control  type="number" min='0' placeholder="Enter 3rd Prize" />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <input
                      placeholder="الجائزة الثالثة"
                      style={{ direction: "rtl" }}
                      onChange={(e) => setThirdPrice(e.target.value)}
                      value={ThirdPrice}
                      type='number'
                      min='0'
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
                      <Form.Control  type="number" min='0' placeholder="Enter 4th Prize" />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="الجائزة الرابعة "
                      onChange={(e) => setFourthPrice(e.target.value)}
                      value={FourthPrice}
                      type='number'
                      min='0'
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
                      <Form.Control  type="number" min='0' placeholder="Enter 5th Prize" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="الجائزة الخامسة "
                      onChange={(e) => setFifthPrice(e.target.value)}
                      value={FifthPrice}
                      type='number'
                      min='0'
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
                      <Form.Control  type="number" min='0' placeholder="Enter 6th Prize" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="الجائزة السادسة"
                      onChange={(e) => setSixthPrice(e.target.value)}
                      value={SixthPrice}
                      type='number'
                      min='0'
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


      {/*  ------------Modal Popup ------------------ */}

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
      <Modal
        show={showTrackLength}
        onHide={handleCloseTrackLength}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Track Length</h2>
        </Modal.Header>
        <Modal.Body>
          <TrackLengthPopup />
        </Modal.Body>
      </Modal>
      <Modal
        show={showRaceKind}
        onHide={handleCloseRaceKind}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Race Kind</h2>
        </Modal.Header>
        <Modal.Body>
          <RaceKindPopup />
        </Modal.Body>
      </Modal>
      <Modal
        show={showRaceCourse}
        onHide={handleCloseRaceCourse}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Create Race Course</h2>
        </Modal.Header>
        <Modal.Body>
          <RaceCoursePopup />
        </Modal.Body>
      </Modal>

      <Modal
        show={showJockey}
        onHide={handleCloseJockey}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Create Jockey</h2>
        </Modal.Header>
        <Modal.Body>
          <JockeyPopup />
        </Modal.Body>
      </Modal>
      <Modal
        show={showSponsor}
        onHide={handleCloseSponsor}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Sponsor</h2>
        </Modal.Header>
        <Modal.Body>
          <SponsorPopup />
        </Modal.Body>
      </Modal>

      <Modal
        show={showGroundType}
        onHide={handleCloseGroundType}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Ground Type</h2>
        </Modal.Header>
        <Modal.Body>
          <GroundTypePopup />
        </Modal.Body>
      </Modal>
 
      
    </>
  );
};

export default RaceForm;
