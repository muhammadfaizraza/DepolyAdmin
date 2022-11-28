import React, { Fragment, useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import Select from "react-select";
import { fetchnationality } from "../../redux/getReducer/getNationality";
import { fetchcolor } from "../../redux/getReducer/getColor";
import { fetchTrackLength } from "../../redux/getReducer/getTracklength";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import ColorPopUp from "../PostTable/Color";
import NationalityPopUp from "../PostTable/Nationality";
import { AiOutlineReload } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchsingleracecourse } from "../../redux/getReducer/getSingleRacecourse";

const RaceCourseForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { state } = useLocation();

  const { data: nationality } = useSelector((state) => state.nationality);
  const { data: color } = useSelector((state) => state.color);
  const { data: trackLength } = useSelector((state) => state.trackLength);
  const { data: singleracecourse } = useSelector((state) => state.singleracecourse);

  


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

  let AllTrack =
    trackLength === undefined ? (
      <></>
    ) : (
      trackLength.map(function (item) {
        return {
          id: item._id,
          value: item.TrackNameEn,
          label: item.TrackNameEn,
        };
      })
    );

  const { courseid } = state;
  const [NationalityId, setNationalityId] = useState("");
  const [ColorCode, setColorCode] = useState("");
  const [state1, setState] = useState({
    TrackNameEn: "",
    TrackNameAr: "",
    ColorCode: "",
    shortCode: "",
  });
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [show, setShow] = useState(false);

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(singleracecourse.image, image);
  };
  useEffect(() => {
    dispatch(fetchnationality());
    dispatch(fetchcolor());
    dispatch(fetchTrackLength());
    dispatch(fetchsingleracecourse());
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);
  useEffect(() => {
    if (singleracecourse) {
      setState({
        NameEn: singleracecourse.NameEn,
        NameAr: singleracecourse.NameAr,
        MaximumJockeyWeight: singleracecourse.MaximumJockeyWeight,
        MiniumumJockeyWeight: singleracecourse.MiniumumJockeyWeight,
      });
    } else {
      dispatch(fetchsingleracecourse({ courseid }));
    }
  }, [singleracecourse]);
  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("TrackNameEn", state1.TrackNameEn);
      formData.append("TrackNameAr", state1.TrackNameAr);
      formData.append("ColorCode", ColorCode.id);
      formData.append("NationalityId", NationalityId.id);
      formData.append("shortCode", state1.shortCode);
      const response = await axios.post(
        `http://3.90.189.40:4000/api/v1/createcourse?keyword=&page=`,
        formData
      );
      swal({
        title: "success!",
        text: "Data Submitted !",
        icon: "success",
        button: "OK",
      });
      history("/racecourse");
    } catch (error) {
      
      swal({
        title: "Error!",
        icon: "error",
        button: "OK",
      });
    }
  };

  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    await setShow(true);
  };
  const FetchNew = () => {
    dispatch(fetchnationality());
    dispatch(fetchcolor());
    dispatch(fetchTrackLength());
  };

  return (
    <Fragment>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Edit Race Course</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Track Name"
                      className="mb-3"
                      value={state1.TrackNameEn}
                      onChange={(e) =>
                        setState({ ...state1, TrackNameEn: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="Track Name" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="رمز قصير"
                      value={state1.TrackNameAr}
                      onChange={(e) =>
                        setState({ ...state1, TrackNameAr: e.target.value })
                      }
                      className="mb-3 floatingInputAr "
                      style={{ direction: "rtl", left: "initial", right: 0 }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="رمز قصير"
                        style={{ left: "%" }}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Short Code"
                      className="mb-3"
                      value={state1.shortCode}
                      onChange={(e) =>
                        setState({ ...state1, shortCode: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="Short Code" />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="رمز قصير"
                      className="mb-3 floatingInputAr "
                      style={{ direction: "rtl", left: "initial", right: 0 }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="رمز قصير"
                        style={{ left: "%" }}
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Color</div>}
                      defaultValue={ColorCode}
                      value={ColorCode}
                      onChange={setColorCode}
                      options={AllColor}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <>
                          <button className="addmore" onClick={handleShow}>
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
                      required
                      placeholder="تقييم الحصان"
                      className="selectdir"
                      defaultValue={ColorCode}
                      value={ColorCode}
                      onChange={setColorCode}
                      options={AllColor}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>

                {/* <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search Country</div>}
                      defaultValue={Country}
                      onChange={setCountry}
                      options={CountryEn}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>اكتب للبحث عن الدولة</div>}
                      options={CountryAr}
                      isClearable={true}
                      isSearchable={true}
                      className="selectdir"
                    />
                  </div>
                </div> */}
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
                <div className="ButtonSection">
                  <div>
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
                    Add Race Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Add Color</h2>
        </Modal.Header>
        <Modal.Body>
          <ColorPopUp />
        </Modal.Body>
      </Modal>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Add Nationality</h2>
        </Modal.Header>
        <Modal.Body>
          <NationalityPopUp />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default RaceCourseForm;
