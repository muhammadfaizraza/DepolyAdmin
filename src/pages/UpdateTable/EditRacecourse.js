import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchsingleracecourse } from "../../redux/getReducer/getSingleRacecourse";
import swal from "sweetalert";
import axios from "axios";
import { fetchnationality } from "../../redux/getReducer/getNationality";
import { fetchcolor } from "../../redux/getReducer/getColor";
import { fetchTrackLength } from "../../redux/getReducer/getTracklength";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Select from "react-select";

const NewsForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { state } = useLocation();
  const { courseid } = state;
  const { data: singleracecourse } = useSelector(
    (state) => state.singleracecourse
  );
  const { data: nationality } = useSelector((state) => state.nationality);
  const { data: color } = useSelector((state) => state.color);
  const { data: trackLength } = useSelector((state) => state.trackLength);

  const [state1, setState] = useState({
    TrackNameEn: "",
    TrackNameAr: "",
    shortCode: "",
    NationalityId: "",
    ColorCode: "",
    image: "",
  });

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

  const [image, setImage] = useState();
  const [NationalityId, setNationalityId] = useState("");
  const [ColorCode, setColorCode] = useState("");
  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(singleracecourse.image, image);
  };

  useEffect(() => {
    dispatch(fetchsingleracecourse({ courseid }));
    dispatch(fetchnationality());
    dispatch(fetchcolor());
    dispatch(fetchTrackLength());
  }, []);

  useEffect(() => {
    if (singleracecourse) {
      setState({
        TrackNameEn: singleracecourse.TrackNameEn,
        TrackNameAr: singleracecourse.TrackNameAr,
        shortCode: singleracecourse.shortCode,
        NationalityId: singleracecourse.NationalityId,
        ColorCode: singleracecourse.ColorCode,
        image: singleracecourse.image,
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
      formData.append("shortCode", state1.shortCode);
      formData.append("NationalityId", state1.NationalityId);
      formData.append("ColorCode", state1.ColorCode);

      const response = await axios.put(
        `${window.env.API_URL}/updatecourse/${courseid}`,
        formData
      );
      history("/racecourse");
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
            <div className="Headers">Edit Race Course</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Track Name"
                      className="mb-3"
                      name="TrackNameEn"
                    >
                      <Form.Control
                        type="text"
                        value={state1.TrackNameEn}
                        onChange={(e) =>
                          setState({ ...state1, TrackNameEn: e.target.value })
                        }
                        placeholder="Track Name"
                      />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="رمز قصير"
                      name="TrackNameAr"
                      className="mb-3 floatingInputAr "
                      style={{ direction: "rtl", left: "initial", right: 0 }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="رمز قصير"
                        style={{ left: "%" }}
                        value={state1.TrackNameAr}
                        onChange={(e) =>
                          setState({ ...state1, TrackNameAr: e.target.value })
                        }
                      />
                    </FloatingLabel>
                  </div>
                </div>

                {/* <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Short Code"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        value={state1.shortCode}
                        onChange={(e) =>
                          setState({ ...state1, shortCode: e.target.value })
                        }
                        placeholder="Short Code"
                      />
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
                        value={state1.shortCode}
                        onChange={(e) =>
                          setState({ ...state1, shortCode: e.target.value })
                        }
                      />
                    </FloatingLabel>
                  </div>
                </div> */}
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
                      
                    
                      |</span>
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
                      
                    
                      |</span>
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
                      onChange={state1.onSelectFile}
                      className="formInput"
                    />
                    {/* {image && (
                      <img src={preview} className="PreviewImage" alt="" />
                    )} */}
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
    </>
  );
};

export default NewsForm;
