import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import DateTimePicker from "react-datetime-picker";
import Select from "react-select";
import { fetchracecourse } from "../../redux/getReducer/getRaceCourseSlice";
import { useSelector , useDispatch } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { AiOutlineReload } from "react-icons/ai";
import { Modal } from "react-bootstrap";

import Racename from "../PostTable/Racenameform";
import MeetingTypePopUp from "../PostTable/MeetingType";
import RaceTypePopup from "../PostTable/Racetypeform";

import TrackLengthPopup from "../PostTable/Tracklengthform";
import GroundTypePopup from "../PostTable/GroundType";
import RaceKindPopup from "../PostTable/RaceKind";
import RaceCoursePopup from "../PostTable/RaceCourseForm";
import JockeyPopup from "../PostTable/JockeyForm";
import SponsorPopup from "../PostTable/SponsorForm";
import { fetchSponsor } from "../../redux/getReducer/getSponsorSlice";
import { fetchMeeting } from "../../redux/getReducer/getMeeting";
import { fetchRaceType } from "../../redux/getReducer/getRacetype";
import { fetchRaceName } from "../../redux/getReducer/getRaceName";
import { fetchTrackLength } from "../../redux/getReducer/getTracklength";
import { fetchRaceKind } from "../../redux/getReducer/getRaceKind";
import { fetchgroundtype } from "../../redux/getReducer/getGroundType";


const RaceStatuss = [
  { id: "1", value: "Cancel", label: "Cancel" },
  { id: "2", value: "Due", label: "Due" },
  { id: "2", value: "Live", label: "Live" },
  { id: "2", value: "End", label: "End" },
];

const NewsForm = () => {
  const history = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { data: racecourse } = useSelector((state) => state.racecourse);
  const { data: sponsor } = useSelector((state) => state.sponsor);
  const { data: meeting } = useSelector((state) => state.meeting);
  const { data: RaceType } = useSelector((state) => state.RaceType);
  const { data: RaceName } = useSelector((state) => state.RaceName);
  const { data: trackLength } = useSelector((state) => state.trackLength);
  const { data: raceKinds,  } = useSelector((state) => state.raceKinds);
  const { data: groundtype } = useSelector((state) => state.groundtype);
  const { fullraceid } = state;
  const [DayNTime, setDayNTime] = useState("");
  const [RaceStatus, setRaceStatus] = useState("");
  const [RaceCourse, setRaceCourse] = useState("");
  const [Sponsor , setSponsor] =useState("");
  const [MeetingType,setMeetingType] =useState("");
  const [RaceNameEn, setRaceNameEn] = useState("");
  const [RaceKind ,setRaceKind] =useState("");
 const [RaceTyp, setRaceType] =useState("");
 const [TrackLength,setTrackLength] =useState("");
 const [Ground ,setGround] =useState(""); 
  console.log(fullraceid)
  let racecourses =
  racecourse === undefined ? (
    <></>
  ) : (
    racecourse.map(function (item) {
      return {
        id: item._id,
        value: item._id,
        label: item.TrackNameEn,
      };
    })
  );
let racecoursesAr =
  racecourse === undefined ? (
    <></>
  ) : (
    racecourse.map(function (item) {
      return {
        id: item._id,
        value: item._id,
        label: item.TrackNameAr,
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
        value: item._id,
        label: item.NameEn,
      };
    })
  );
let RacenameoptionsAr =
  RaceName === undefined ? (
    <></>
  ) : (
    RaceName.map(function (item) {
      return {
        id: item._id,
        value: item._id,
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
            <img src={item.image} height="30px" width="30px" alt="" />
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
        value: item._id,
        label: item.NameEn,
      };
    })
  );
let MeetingTypesAr =
  meeting === undefined ? (
    <></>
  ) : (
    meeting.map(function (item) {
      return {
        id: item._id,
        value: item._id,
        label: item.NameAr,
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
        value: item._id,
        label: item.NameEn,
      };
    })
  );

let RaceTypesAr =
  RaceType === undefined ? (
    <></>
  ) : (
    RaceType.map(function (item) {
      return {
        id: item._id,
        value: item._id,
        label: item.NameAr,
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
        value: item._id,
        label: item.NameEn,
      };
    })
  );
let OprtionRaceKindAr =
  raceKinds === undefined ? (
    <></>
  ) : (
    raceKinds.map(function (item) {
      return {
        id: item._id,
        value: item._id,
        label: item.NameAr,
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
        value: item._id,
        label: item.NameEn,
      };
    })
  );
let GroundrTypeAllAr =
  groundtype === undefined ? (
    <></>
  ) : (
    groundtype.map(function (item) {
      return {
        id: item._id,
        value: item._id,
        label: item.NameAr,
      };
    })
  );
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
  const handleCloseJockey = () => setShowJockey(false);
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

  const FetchNew = () => {
    dispatch(fetchracecourse());
    dispatch(fetchSponsor());
    dispatch(fetchMeeting());
    dispatch(fetchRaceType());
    dispatch(fetchRaceName());
    dispatch(fetchTrackLength());
    dispatch(fetchRaceKind());
    dispatch(fetchgroundtype());
  
  };
  const [state1, setState] = useState({
		MeetingCode: '',
    DescriptionEn:'',
		DescriptionAr: '',
    WeatherDegree: '',
    RaceStatus:'',
    FirstPrice:'',
    SecondPrice:'',
    ThirdPrice:'',
    FourthPrice:'',
    FifthPrice:'',
    SixthPrice:'',
    DayNTime:'',
    RaceCourse:'',
    WeatherIcon:"",
    Sponsor:"",
    MeetingType:"",
    RaceName:"",
    RaceType:"",
    TrackLength:"",
    Ground:"",
    RaceKind:""

    
	});
  const [image,setImage] = useState();
  const [preview,setPreview] = useState();

  
  

  useEffect(() => {
		if (fullraceid) {
			setState({
				MeetingCode: fullraceid.MeetingCode,
        DescriptionEn: fullraceid.DescriptionEn,
				DescriptionAr: fullraceid.DescriptionAr,
        WeatherDegree: fullraceid.WeatherDegree,
        FirstPrice: fullraceid.FirstPrice,
        SecondPrice: fullraceid.SecondPrice,
        ThirdPrice: fullraceid.ThirdPrice,
        FourthPrice: fullraceid.FourthPrice,
        FifthPrice: fullraceid.FifthPrice,
        SixthPrice: fullraceid.SixthPrice,
        RaceStatus: fullraceid.RaceStatus,
         DayNTime:fullraceid.DayNTime,
        RaceCourse:fullraceid.RaceCourse,
        WeatherIcon:fullraceid.WeatherIcon,
        Sponsor:fullraceid.Sponsor,
        image:fullraceid.image,
        MeetingType:fullraceid.MeetingType,
        RaceName:fullraceid.RaceName,
        RaceType:fullraceid.RaceType,
        RaceKind:fullraceid.RaceKind,
        Ground:fullraceid.Ground,
        TrackLength:fullraceid.TrackLength
			});

		} else {
		}
	}, [fullraceid]);
  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image, image);
  };
  useEffect(() => {
    dispatch(fetchracecourse());
    if (image === undefined) {
      setPreview(fullraceid.image)
      return
  }  
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
}, [image])

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image",  (image ===  undefined ? state1.image : image));
      formData.append("MeetingCode", state1.MeetingCode);
      formData.append("DescriptionEn", state1.DescriptionEn);
      formData.append("DescriptionAr", state1.DescriptionAr + ' ');
      formData.append("WeatherDegree", state1.WeatherDegree);
      formData.append("FirstPrice", state1.FirstPrice);
      formData.append("RaceStatus", (RaceStatus.value ===  undefined ? state1.RaceStatus : RaceStatus.value));
      formData.append("RaceCourse", RaceCourse.id === undefined ? state1.RaceCourse : RaceCourse.id);
      formData.append("Sponsor", Sponsor.id === undefined ? state1.Sponsor : Sponsor.id);
      formData.append("TrackLength", TrackLength.id === undefined ? state1.TrackLength : TrackLength.id);
      formData.append("Ground", Ground.id === undefined ? state1.Ground : Ground.id);
      formData.append("RaceName", RaceName.id === undefined ? state1.RaceName : RaceName.id);
      formData.append("RaceType", RaceTyp.id === undefined ? state1.RaceTyp : RaceTyp.id);
  
      formData.append("SecondPrice", state1.SecondPrice); 
      formData.append("ThirdPrice", state1.ThirdPrice);
      formData.append("FourthPrice", state1.FourthPrice);
      formData.append("FifthPrice", state1.FifthPrice);
      formData.append("SixthPrice", state1.SixthPrice);
      formData.append("DayNTime", (DayNTime ===  '' ? state1.DayNTime : DayNTime));

      const response = await axios.put(`${window.env.API_URL}/updaterace/${fullraceid._id}`, formData);
      history("/races");
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

  var today = new Date();
  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Edit Race</div>
            <div className="form">
              <form onSubmit={submit}>
              <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>{fullraceid.MeetingTypeData.NameEn}</div>}
                      defaultValue={MeetingType}
                      onChange={setMeetingType}
                      options={MeetingTypes}
                      isClearable={true}
                      isSearchable={true}
                
                    />
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
                      </OverlayTrigger>
                      |
                    </span>
                 
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>نوع الاجتماع</div>}
                      defaultValue={MeetingType}
                      className="selectdir"
                      options={MeetingTypesAr}
                      onChange={setMeetingType}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>{fullraceid.RaceNameModelData.NameEn}</div>}
                      defaultValue={RaceNameEn}
                      onChange={setRaceNameEn}
                      options={Racenameoptions}
                      isClearable={true}
                      isSearchable={true}
                 
                    />
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
                      </OverlayTrigger>
                      |
                    </span>
                 
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>اسم العرق</div>}
                      className="selectdir"
                      defaultValue={RaceNameEn}
                      onChange={setRaceNameEn}
                      options={RacenameoptionsAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>{fullraceid.RaceKindData.NameEn}</div>}
                      defaultValue={RaceKind}
                      onChange={setRaceKind}
                      options={OprtionRaceKind}
                      isClearable={true}
                      isSearchable={true}
                  
                    />
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
                      options={OprtionRaceKindAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
              <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Meeting Code"
                      className="mb-3"
                      
                      onChange={(e) =>
                        setState({ ...state1, MeetingCode: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Details"  value={state1.MeetingCode}/>
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="رمز الاجتماع"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, MeetingCode: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.MeetingCode}/>
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Description"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, DescriptionEn: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Details"   value={state1.DescriptionEn}/>
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="وصف"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, DescriptionAr: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.DescriptionAr}/>
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row  mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Weather Icon"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, WeatherIcon: e.target.value })
                      }      
               
                    >
                      <Form.Control type="text" placeholder="Weather Icon"  value={state1.WeatherIcon} />
                    </FloatingLabel>
                    <span className="spanForm">|</span>
             
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label=" رمز الطقس"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                    
                    >
                      <Form.Control type="text" placeholder=" رمز الطقس" value={state1.WeatherIcon}/>
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Weather Degree"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, WeatherDegree: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Weather Degree"   value={state1.WeatherDegree}/>
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="درجة الطقس"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, WeatherDegree: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="درجة الطقس"   value={state1.WeatherDegree}/>
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
                    <Select
                      placeholder={<div>{fullraceid.RaceTypeModelData.NameEn}</div>}  
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
                      options={RaceTypesAr}
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
                <p className="selectLabel">Race Course</p>
                  <div className="col-sm">
                    <Select
                      placeholder={<div>{fullraceid.RaceCourseData.TrackNameEn}</div>}
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
                        <span
                          className="addmore"
                          onClick={handleShowRaceCourse}
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
                      placeholder={<div>دورة السباق</div>}
                      className="selectdir"
                      options={racecoursesAr}
                      defaultValue={RaceCourse}
                      onChange={setRaceCourse}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                <p className="selectLabel">Sponsor Image</p>
                  <div className="col-sm">
                    <Select
                      placeholder={<div className="sponsorPlaceholder">  <img src={fullraceid.SponsorData.image} alt=""/></div>}
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
                <p className="selectLabel">Track Length</p>
                  <div className="col-sm">
                    <Select
                      placeholder={<div>{fullraceid.TrackLengthData.TrackLength}</div>}
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
                        <span
                          className="addmore"
                          onClick={handleShowTrackLength}
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
                      placeholder={<div>{fullraceid.GroundData.NameEn}</div>}
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
                        <span
                          className="addmore"
                          onClick={handleShowGroundType}
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
                      placeholder={<div>طقس</div>}
                      className="selectdir"
                      options={GroundrTypeAllAr}
                      defaultValue={Ground}
                      onChange={setGround}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="First Prize"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, FirstPrice: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Weather Degree"   value={state1.FirstPrice}/>
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="السعر الأول"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, FirstPrice: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.FirstPrice}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Second Prize"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, SecondPrice: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Weather Degree"   value={state1.SecondPrice}/>
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الجائزة الثانية"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, SecondPrice: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.SecondPrice}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Third Prize"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, ThirdPrice: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Weather Degree"   value={state1.ThirdPrice}/>
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الجائزة الثالثة"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, ThirdPrice: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.ThirdPrice}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Fourth Prize"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, FourthPrice: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Weather Degree"   value={state1.FourthPrice}/>
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الجائزة الرابعة"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, FourthPrice: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.FourthPrice}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Fifth Prize"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, FifthPrice: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Prize"   value={state1.FifthPrice}/>
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الجائزة الخامسة"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, FifthPrice: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="الجائزة الخامسة"   value={state1.FifthPrice}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Sixth Prize"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, SixthPrice: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Weather Degree"   value={state1.SixthPrice}/>
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الجائزة السادسة"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, SixthPrice: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.SixthPrice}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="ButtonSection">
                <div>
                <input type='file' onChange={fileSelected} className="formInput"/>
                <img src={preview}  className="PreviewImage" alt=""/>

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

export default NewsForm;
