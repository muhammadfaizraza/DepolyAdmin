import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { fetchgroundtype } from "../../redux/getReducer/getGroundType";
import { fetchracecourse } from "../../redux/getReducer/getRaceCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import { AiOutlineReload } from "react-icons/ai";
import RaceCoursePopup from "../PostTable/RaceCourseForm";
import GroundTypePopup from "../PostTable/GroundType";

const NewsForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { state } = useLocation();
  const { data: racecourse } = useSelector((state) => state.racecourse);
  const { data: groundtype } = useSelector((state) => state.groundtype);

  const [showGroundType, setShowGroundType] = useState(false);
  const [showActiveRaceCourse, setShowActiveRaceCourse] = useState(false);

  const handleCloseGroundType = () => setShowGroundType(false);
  const handleCloseActiveRaceCourse = () => setShowActiveRaceCourse(false);

  const handleShowGroundType = async () => {
    await setShowGroundType(true);
  };
  const handleShowRaceCourse = async () => {
    await setShowActiveRaceCourse(true);
  };

  let courseoptions =
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

  let groundtypeopt =
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
  const FetchNew = () => {
    dispatch(fetchgroundtype());
    dispatch(fetchracecourse());
  };
  const { trackid } = state;
  const [image, setImage] = useState();
  const [preview,setPreview] = useState()
  const [GroundType, setGroundType] = useState();
  const [RaceCourse, setRaceCourse] = useState("");

  const [state1, setState] = useState({
    TrackLength: "",
    RailPosition: "",
    image: image,
  });

  useEffect(() => {
    if (trackid) {
      setState({
        TrackLength: trackid.TrackLength,
        RailPosition: trackid.RailPosition,
        image: trackid.image,
      });
    } else {
      alert("No Data");
    }
  }, [trackid]);

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("RailPosition", state1.RailPosition);
      formData.append("TrackLength", state1.TrackLength);
      formData.append("RaceCourse", RaceCourse.id);
      formData.append("GroundType", GroundType.id);
      formData.append("image", image);
      formData.append("RaceCourse", RaceCourse.id === undefined ? state1.RaceCourse : RaceCourse.id);
      formData.append("GroundType", GroundType.id === undefined ? state1.GroundType : GroundType.id);

      await axios.put(
        `${window.env.API_URL}/updateTrackLength/${trackid._id}`,
        formData
      );
      history("/tracklength");
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
  useEffect(() => {
    if (image === undefined) {
      setPreview(trackid.image)
      return
  }  
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
}, [image])
  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Edit Track Length</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Track Length"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, TrackLength: e.target.value })
                      }
                    >
                      <Form.Control
                        type="number"
                        placeholder="Description"
                        value={state1.TrackLength}
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
                        setState({ ...state1, TrackLength: e.target.value })
                      }
                    >
                      <Form.Control
                        type="number"
                        placeholder="Description"
                        value={state1.TrackLength}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Rail Position"
                      className="mb-3 "
                      onChange={(e) =>
                        setState({ ...state1, RailPosition: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.RailPosition}
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
                        setState({ ...state1, RailPosition: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.RailPosition}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>{trackid.GroundTypeModelData.NameEn}</div>}
                      defaultValue={GroundType}
                      onChange={setGroundType}
                      options={groundtypeopt}
                      isClearable={true}
                      isSearchable={true}
                    />
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
                      </OverlayTrigger>
                      |
                    </span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>نوع الأرض</div>}
                      className="selectdir"
                      defaultValue={GroundType}
                      onChange={setGroundType}
                      options={groundtypeopt}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>{trackid.TrackLengthRaceCourseData.TrackNameEn}</div>}
                      defaultValue={RaceCourse}
                      onChange={setRaceCourse}
                      options={courseoptions}
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
                      required
                      placeholder={<div>نوع الأرض</div>}
                      className="selectdir"
                      defaultValue={RaceCourse}
                      onChange={setRaceCourse}
                      options={courseoptions}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
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
      <Modal
        show={showActiveRaceCourse}
        onHide={handleCloseActiveRaceCourse}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>RaceCourse</h2>
        </Modal.Header>
        <Modal.Body>
          <RaceCoursePopup />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewsForm;
