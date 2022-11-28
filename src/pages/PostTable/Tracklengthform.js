import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { fetchracecourse } from "../../redux/getReducer/getRaceCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { fetchgroundtype } from "../../redux/getReducer/getGroundType";

const Tracklengthform = () => {
  const dispatch = useDispatch();
  const { data: racecourse } = useSelector((state) => state.racecourse);
  const { data: groundtype } = useSelector((state) => state.groundtype);

  const [TrackLength, setTrackLength] = useState();
  const [RaceCourse, setRaceCourse] = useState("");
  const [RaceCourseImage, setRaceCourseImage] = useState();
  const [GroundType, setGroundType] = useState();
  const [preview, setPreview] = useState();
  const [RailPosition, setRailPosition] = useState();

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

      await axios.post(`http://3.90.189.40:4000/api/v1/uploadTrackLength`, formData);
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });
      history("/tracklength");
    } catch (error) {
      const err = error.message;
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
      alert("select valid image.");
      return;
    }
    const objectUrl = URL.createObjectURL(RaceCourseImage);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [RaceCourseImage]);

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
                    <Form.Control type="number" placeholder="Track Length" />
                  </FloatingLabel>
                  <span className="spanForm"> |</span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="طول المسار"
                    className="mb-3 floatingInputAr"
                    name="Name"
                    value={TrackLength}
                    style={{ direction: "rtl" }}
                  >
                    <Form.Control type="text" placeholder="طول المسار" />
                  </FloatingLabel>
                </div>
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
                    <Form.Control type="text" placeholder="Rail Position" />
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
                    <Form.Control type="text" placeholder="طول المسار" />
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
    </div>
  );
};

export default Tracklengthform;
