import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { fetchracecourse } from "../../redux/getReducer/getRaceCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {AiOutlineReload} from "react-icons/ai"
import { Modal } from "react-bootstrap";
import RaceCoursePopup from "../PostTable/RaceCourseForm";

const NewsForm = () => {
  const dispatch = useDispatch()
  const history = useNavigate();
  const { state } = useLocation();

  const { data: racecourse } = useSelector((state) => state.racecourse);
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
  const [showActiveRacecourse, setShowActiveRacecourse] = useState(false);

  const handleCloseActivenationality = () => setShowActiveRacecourse(false);

  const handleShowActiverRacecouse = async () => {
    await setShowActiveRacecourse(true);
  };


  const { RaceId } = state;
  const [image, setImage] = useState();
  const [RaceCourse, setRaceCourse] = useState("");

  const [state1, setState] = useState({
    RaceCardNameEn: "",
    RaceCardNameAr: "",
    RaceCardCourse:""

  });
  const FetchNew =() =>{

    dispatch(fetchracecourse())
    
      }
console.log(RaceId)
  useEffect(() => {
    if (RaceId) {
      setState({
        RaceCardNameEn: RaceId.RaceCardNameEn,
        RaceCardNameAr: RaceId.RaceCardNameAr,
        RaceCardCourse: RaceId.RaceCardCourse,
      });
    } else {
      alert("No Data");
    }
  }, [RaceId]);

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("RaceCardNameEn", state1.RaceCardNameEn);
      formData.append("RaceCardNameEn", state1.RaceCardNameEn);
 
      formData.append("RaceCourse", RaceCourse.id === undefined ? state1.RaceCourse : RaceCourse.id);

 await axios.put(
        `${window.env.API_URL}/updateRaceCard/${RaceId._id}`,
        formData
      );
      history("/racecardlisting");
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
            <div className="Headers">Edit Race Card</div>
            <div className="form">
              <form onSubmit={submit}>
               

                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Race Card Name"
                      className="mb-3 "
                      onChange={(e) =>
                        setState({ ...state1, RaceCardNameEn: e.target.value })
                      }
                     
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.RaceCardNameEn}/>
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
                        setState({ ...state1, RaceCardNameAr: e.target.value })
                      }
                     
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.RaceCardNameAr}/>
                    </FloatingLabel>
                    
                  </div>
                </div>



              <div className="row mainrow">
                <div className="col-sm">
                  <Select
                    placeholder={<div>{RaceId.RaceCardCourseData.TrackNameEn}</div>}
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
                        <span className="addmore" onClick={handleShowActiverRacecouse}>
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
                    defaultValue={RaceCourse}
                    onChange={setRaceCourse}
                    options={courseoptions}
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
      <Modal
       show={showActiveRacecourse}
       onHide={handleCloseActivenationality}
       size="lg"
       aria-labelledby="contained-modal-title-vcenter"
       centered
     >
       <Modal.Header closeButton>
         <h2>Race Course</h2>
       </Modal.Header>
       <Modal.Body>
         < RaceCoursePopup/>
       </Modal.Body>
     </Modal>
    </>
  );
};

export default NewsForm;
