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

const NewsForm = () => {
  const history = useNavigate();
  const { state } = useLocation();
  const { data: racecourse } = useSelector((state) => state.racecourse);
  const { data: groundtype } = useSelector((state) => state.groundtype);
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
  const { trackid } = state;
  const [image, setImage] = useState();
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
      formData.append("RaceCourse",RaceCourse.id);
      formData.append("GroundType",GroundType.id);
      formData.append("image", image);

      const response = await axios.put(
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
                    <input
                      type="text"
                      name="TitleEn"
                      id="TitleEn"
                      className="group__control"
                      placeholder="Track Length"
                      value={state1.TrackLength}
                      onChange={(e) =>
                        setState({ ...state1, TrackLength: e.target.value })
                      }
                    />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="اسم "
                      type="text"
                      name="TitleAr"
                      id="TitleAr"
                      className="group__control"
                      value={state1.TrackLength}
                      onChange={(e) =>
                        setState({ ...state1, TrackLength: e.target.value })
                      }
                    ></input>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <input
                      type="text"
                      name="TitleEn"
                      id="TitleEn"
                      className="group__control"
                      placeholder="Rail Position"
                      value={state1.RailPosition}
                      onChange={(e) =>
                        setState({ ...state1, RailPosition: e.target.value })
                      }
                    />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="اسم "
                      type="text"
                      name="TitleAr"
                      id="TitleAr"
                      className="group__control"
                      value={state1.RailPosition}
                      onChange={(e) =>
                        setState({ ...state1, RailPosition: e.target.value })
                      }
                    ></input>
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

              <div className="row mainrow">
                <div className="col-sm">
                  <Select
                    placeholder={<div>Select Ground Type</div>}
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
                  <input type="file" size="60" onChange={fileSelected} />
                  <button type="submit" className="SubmitButton">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsForm;
