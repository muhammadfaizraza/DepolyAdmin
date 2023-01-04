import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import { fetchracecourse } from "../../../redux/getReducer/getRaceCourseSlice";
import { useSelector, useDispatch } from "react-redux";
import makeAnimated from "react-select/animated";
import dateFormat from "dateformat";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../../utils/TextInputValidation";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {AiOutlineReload} from "react-icons/ai"
import { Fragment } from "react";
import { Modal } from "react-bootstrap";
import NationalityPopup from "../RaceCourseForm";


const Nationality = () => {

  //for errors
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const [ErrorRaceCourse, setErrorRaceCourse] = useState("");

  const [Race, setRace] = useState("");
  const [DayNTime, setDayNTime] = useState("");
  const [FetchData, setFetchData] = useState([]);
  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [showActivenationality, setShowActivenationality] = useState(false);

  const handleCloseActivenationality = () => setShowActivenationality(false);

  const handleShowActivenationality = async () => {
    await setShowActivenationality(true);
  };

  const { data: racecourse } = useSelector((state) => state.racecourse);

  let AllFetchData =
    FetchData === undefined ? (
      <></>
    ) : (
      FetchData.map(function (item) {
        return {
          id: item._id,
          value: item.RaceNameModelData.shortCode,
          label: item.RaceNameModelData.NameEn,
        };
      })
    );

  let Racenameoptions =
    racecourse === undefined ? (
      <></>
    ) : (
      racecourse.map(function (item) {
        return {
          id: item._id,
          value: item._id,
          label: (
            <div style={{
              display:'flex',
              justifyContent:'space-between'
            }}>
             <p>{item.TrackNameEn}</p> 
             <p>{item.TrackNameAr}</p> 
  
            </div>
          ),
        };
      })
    );
  const history = useNavigate();
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const FormaredDate = dateFormat(DayNTime, "isoDateTime");
  var today = new Date();

  useEffect(() => {
    dispatch(fetchracecourse());
  }, [dispatch]);
  const FetchNew =() =>{

dispatch(fetchracecourse())

  }


  const Submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("RaceCardNameEn", NameEn);
      formData.append("RaceCardNameAr", NameAr);
      formData.append("RaceCardCourse", Race.id);
      const response = await axios.post(
        `${window.env.API_URL}/uploadRaceCard`,
        formData
      );
      const CardId = response.data.data._id;
      history("/publishracecard", {
        state: {
          CardId: CardId,
          RaceCourseId: Race.id,
        },
      });
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });
    } catch (error) {
      console.log(error);
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }
  };

  const data1 = JSON.stringify(
    TextInputValidation("en", NameEn, "Race Card Name English")
  );

  const obj = JSON.parse(data1);
  const data2 = JSON.stringify(
    TextInputValidation("ar", NameAr, "Race Card Name Arabic")
  );
  const objAr = JSON.parse(data2);
  return (
    <Fragment>
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Race Card</div>
          <div className="form">
            <div className="row mainrow">
              <div className="col-sm">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Race Card Name"
                  className="mb-3"
                  onChange={(e) => setNameEn(e.target.value)}
                  value={NameEn}
                  onBlur={() => setError(obj)}
                >
                  <Form.Control type="text" placeholder="Race Card Name" />
                </FloatingLabel>

                <span className="spanForm"> |</span>
                <span className={Error.status ? 'success' : 'error'} >{Error.message}</span>
              </div>
              <div className="col-sm">
                <FloatingLabel
                  controlId="floatingInput"
                  label="رمز قصير"
                  onChange={(e) => setNameAr(e.target.value)}
                  value={NameAr}
                  onBlur={() => setErrorAr(objAr)}
                  className="mb-3 floatingInputAr "
                  style={{ direction: "rtl", left: "initial", right: 0 }}
                >
                  <Form.Control
                    type="text"
                    placeholder="اسم"
                    style={{ left: "%" }}
                  />
                </FloatingLabel>
                <span className={ErrorAr.status ? 'successAr' : 'errorAr'}>{ErrorAr.message}</span>
              </div>
            </div>

            <div className="row mainrow">
              <div className="col-sm">
                <Select
                  placeholder={<div>Select Race Course</div>}
                  isClearable={true}
                  isSearchable={true}
                  defaultValue={Race}
                  value={Race}
                  onChange={setRace}
                  options={Racenameoptions}
                  onBlur={() =>
                    Race === ""
                      ? setErrorRaceCourse("Race Course is required")
                      : setErrorRaceCourse("Race Course is Validated")
                  }
                />
                 <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span className="addmore" onClick={handleShowActivenationality}>
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
                      
                    </span>
                <span className={Race === '' ? "error" : "success"}>{ErrorRaceCourse}</span>
              </div>

              {/* <div className="col-sm">
                <Select
                  required
                  placeholder={<div>حدد نوع الجنس</div>}
                  className="selectdir"
                  isClearable={true}
                  isSearchable={true}
                />
              </div> */}
            </div>

            <div className="ButtonSection " style={{ justifyContent: "end" }}>
              <button Name="submit" className="SubmitButton" onClick={Submit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
       <Modal
       show={showActivenationality}
       onHide={handleCloseActivenationality}
       size="lg"
       aria-labelledby="contained-modal-title-vcenter"
       centered
     >
       <Modal.Header closeButton>
         <h2>Race Course</h2>
       </Modal.Header>
       <Modal.Body>
         < NationalityPopup/>
       </Modal.Body>
     </Modal>
     </Fragment>
  );
};

export default Nationality;
