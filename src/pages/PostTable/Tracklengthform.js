import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate ,useLocation } from "react-router-dom";
import Select from "react-select";
import { fetchracecourse } from "../../redux/getReducer/getRaceCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { fetchgroundtype } from "../../redux/getReducer/getGroundType";
import { Modal } from "react-bootstrap";
import { AiOutlineReload } from "react-icons/ai";

import RaceCoursePopup from "./RaceCourseForm";
import GroundTypePopup from "./GroundType";

const Tracklengthform = () => {
  const dispatch = useDispatch();
  const { data: racecourse } = useSelector((state) => state.racecourse);
  const { data: groundtype } = useSelector((state) => state.groundtype);

    const [showGroundType, setShowGroundType] = useState(false);
    const [showActiveRaceCourse, setShowActiveRaceCourse] = useState(false);

    const handleCloseGroundType= () => setShowGroundType(false);
    const handleCloseActiveRaceCourse= () => setShowActiveRaceCourse(false);

    const handleShowGroundType = async () => {
      await setShowGroundType(true);
    };
  
    const handleShowRaceCourse = async () => {
      await setShowActiveRaceCourse(true);
    };

  const [TrackLength, setTrackLength] = useState();
  const [RaceCourse, setRaceCourse] = useState("");
  const [RaceCourseImage, setRaceCourseImage] = useState();
  const [GroundType, setGroundType] = useState();
  const [preview, setPreview] = useState();
  const [RailPosition, setRailPosition] = useState();

  const {pathname} = useLocation();
  const history = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("TrackLength", TrackLength);
      formData.append("RaceCourse", RaceCourse.id);
      formData.append("image", RaceCourseImage);
      formData.append("GroundType", GroundType.id);
      formData.append("RailPosition", RailPosition);

      await axios.post(`${window.env.API_URL}/uploadTrackLength`, formData);
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });
      if(pathname === '/tracklengthform'){
        history("/tracklength");
      }
     
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
  const onSelectFile = (e) => {
    setRaceCourseImage(e.target.files[0]);
  };

  useEffect(() => {
    dispatch(fetchgroundtype());
    dispatch(fetchracecourse());

    if (!RaceCourseImage) {
      setPreview(undefined);
      return;
    }

    if (!RaceCourseImage.name.match(/\.(gif)$/)) {
   
      swal({
        title: "Error!",
        text: "Enter Gif Image",
        icon: "error",
        button: "OK",
    
      });
      
      return false
    }
  
    const objectUrl = URL.createObjectURL(RaceCourseImage);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [RaceCourseImage ,dispatch]);

  const FetchNew = () => {
    dispatch(fetchgroundtype());
    dispatch(fetchracecourse());
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

  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Track Length</div>
          <div className="form">
            <form onSubmit={submit}>
              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Track Length"
                    className="mb-3"
                    onChange={(e) => setTrackLength(e.target.value)}
                    value={TrackLength}
                  >
                    <Form.Control type="number" placeholder="Track Length" required/>
                  </FloatingLabel>
                  {/* <span className="spanForm"> |</span> */}
                </div>

                {/* <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="طول المسار"
                    className="mb-3 floatingInputAr"
                    name="Name"
                    value={TrackLength}
                    style={{ direction: "rtl" }}
                  >
                    <Form.Control type="number" placeholder="طول المسار" required/>
                  </FloatingLabel>
                </div> */}
              </div>
              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Rail Position"
                    className="mb-3"
                    onChange={(e) => setRailPosition(e.target.value)}
                    value={RailPosition}
                  >
                    <Form.Control type="text" placeholder="Rail Position" required/>
                  </FloatingLabel>
                  <span className="spanForm"> |</span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="موقف السكك الحديدية"
                    className="mb-3 floatingInputAr"
                    name="Name"
                    value={RailPosition}
                    style={{ direction: "rtl" }}
                  >
                    <Form.Control type="text" placeholder="طول المسار" required/>
                  </FloatingLabel>
                </div>
              </div>
              <div className="row mainrow">
                <div className="col-sm">
                  <Select
                    placeholder={<div>Select RaceCourse</div>}
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
                    required
                    placeholder={<div>حدد جيلتي</div>}
                    className="selectdir"
                    defaultValue={RaceCourse}
                    onChange={setRaceCourse}
                    options={courseoptions}
                    isClearable={true}
                    isSearchable={true}
                  />
                </div>
              </div>

              <div className="row mainrow">
                <div className="col-sm">
                  <Select
                    placeholder={<div>Select Ground Type</div>}
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
              <div className="ButtonSection">
           
                <div>
                <label className="Multipleownerlabel">
                      Select GIF Image
                    </label>
                  <input
                    type="file"
                    onChange={onSelectFile}
                    className="formInput"
                  />
                  {RaceCourseImage && (
                    <img src={preview} alt="" className="PreviewImage" />
                  )}
                </div>

                <button type="submit" className="SubmitButton">
                  Add Track Length
                </button>
              </div>
            </form>
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
    </div>
  );
};

export default Tracklengthform;
