import React, { useEffect, Fragment, useState } from "react";
import { fetchdeletedrace, STATUSES } from "../../redux/getDeletedreducer/DeletedRaceSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import Pagination from "../../pages/GetTable/Pagination";
import {FaTrashRestoreAlt} from "react-icons/fa"
import { Modal } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import Moment from "react-moment";

import RaceDetailPopup from "../Popup/RaceDetailPopup";


const DeletedRace = () => {
    const [showRacePopup, setShowRacePopup] = useState(false);
    const [modaldataPopup, setmodaldataPopup] = useState();
    const handleCloseRacePopup = () => setShowRacePopup(false);
    const handleShowRacePopup = async (data) => {
      setmodaldataPopup(data);
      await setShowRacePopup(true);
    };
    
    const [Disable , setDisable] = useState(true);
    //for Modal
    const [show, setShow] = useState(false);
    const [modaldata, setmodaldata] = useState();
    const handleClose = () => setShow(false);
    const handleShow = async (data) => {
      setmodaldata(data);
      await setShow(true);
    };
    const Restorefunction = async ( id) => {
      try{
    
      //buttons disable
      setDisable(false)
    
     await axios.post(`${window.env.API_URL}/restoresoftdeleterace/${id}`, );
      // api 
      // button enable
      dispatch(fetchdeletedrace());
      setDisable(true)
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });
    }catch (error) {
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }
  
  
    
    }
    const dispatch = useDispatch();
  
    const { data: deletedrace, status } = useSelector((state) => state.deletedrace);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8)
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = deletedrace.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
  
    useEffect(() => {
      dispatch(fetchdeletedrace());
    }, [dispatch]);
  
  
    if (status === STATUSES.LOADING) {
      return (
        <Lottie animationData={HorseAnimation} loop={true} className="Lottie" />
      );
    }
  
    if (status === STATUSES.ERROR) {
      return (
        <h2
          style={{
            margin: "100px",
          }}
        >
          Something went wrong!
        </h2>
      );
    }
    const Prize = (data) => {
        return (
          <>
            <table className="Prizeclass">
              <thead className="Prizeclassthead">
                <tr>
                  <th>1st</th>
                  <th>2nd </th>
                  <th>3rd </th>
                  <th>4th </th>
                  <th>5th </th>
                  <th>6th </th>
                </tr>
              </thead>
              <tbody className="Prizeclasstbody">
                <tr>
                  <td>{data.data.FirstPrice}</td>
                  <td>{data.data.SecondPrice}</td>
                  <td>{data.data.ThirdPrice}</td>
                  <td>{data.data.FourthPrice}</td>
                  <td>{data.data.FifthPrice}</td>
                  <td>{data.data.SixthPrice}</td>
                </tr>
              </tbody>
            </table>
          </>
        );
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
            <div className="Header ">
            <h4> Race Listings</h4>
            <div>
               
                <Link to="/raceform">
                  <button>Add Race</button>
                </Link>
              </div>
            </div>

            <div class="div_maintb">
              <ScrollContainer className="scroll-container">
                <table className="Sc">
                  <thead
                    style={{
                      marginTop: "30px",
                    }}
                  >
                    <tr className="trtabletd">
                      <th>Race Name</th>
                      <th>Race Name Arabic </th>
                      <th>Race Type</th>
                      <th>Race Cource</th>
                      <th>Description</th>
                      <th>Description Arabic</th>
                      <th>Track Length</th>
                      <th>Number of Horses</th>
                      <th>Weather in Degree</th>
                      <th>Weather Type</th>
                      <th>Day & Time</th>
                      {/* <th>Total Horses</th> */}
                      <th>Race Status</th>
                      <th>Prize Money</th>
                      <th>image</th>
                    
                      <th>Action</th>
                    </tr>
                  </thead>
                  {deletedrace === undefined ? (
                    <h3
                      style={{
                        textAlign: "center",
                      }}
                    >
                      No Data
                    </h3>
                  ) : (
                    <>
                      {currentPosts.map((item) => {
                        const { RaceStatus } = item;
                        return (
                          <tbody
                            key={item._id}
                            style={{
                              marginTop: "20px",
                            }}
                          >
                            <tr>
                              <td
                                style={{
                                  backgroundColor: `${
                                    RaceStatus === "Cancel"
                                      ? "#000000"
                                      : RaceStatus === "End"
                                      ? "#FF0000"
                                      : RaceStatus === "Live"
                                      ? "#5EC30F"
                                      : "#FF9900"
                                  }`,
                                  color: `${
                                    RaceStatus === "Cancel"
                                      ? "#ffff"
                                      : RaceStatus === "End"
                                      ? "#00000"
                                      : RaceStatus === "Live"
                                      ? "#00000"
                                      : "#000000"
                                  }`,
                                }}
                              >
                                {item.RaceNameModelData&&  item.RaceNameModelData.NameEn}
                              </td>
                              <td>   {item.RaceNameModelData&&  item.RaceNameModelData.NameAr} </td>
                              <td>{item.RaceTypeModelData&& item.RaceTypeModelData.NameEn} </td>
                              <td>
                                {item.RaceCourseData&& item.RaceCourseData.TrackNameEn}
                              
                              </td>
                              <td
                                style={{
                                  maxHeight: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.DescriptionEn}
                              </td>
                              <td
                                style={{
                                  maxHeight: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.DescriptionAr}
                              </td>
                              <td>{item.TrackLengthData&& item.TrackLengthData.TrackLength}</td>
                              <td>{item.RaceAndHorseModelData.length}</td>
                              <td>{item.WeatherDegree}</td>
                              <td>{item.WeatherType}</td>
                              <td>
                          
                                <Moment parse="YYYY-MM-DD HH:mm">
                                  {item.DayNTime}
                                </Moment>
                              </td>
                              {/* <td>{item.HorseModel}</td> */}
                              {/* <td>{item.Horses.length}</td> */}
                              <td>{item.RaceStatus}</td>
                              <td>
                                <button
                                  className="Approvedbtn resultbtn"
                                  onClick={() => handleShow(item)}
                                >
                                  Click
                                </button>
                              </td>
                              <td>
                         
                                <img
                                  src={item.image}
                                  alt=""
                                  style={{
                                    width: "50px",
                                  }}
                                />
                              </td>
                              <td className="table_delete_btn1">
                                <FaTrashRestoreAlt onClick={() => Restorefunction(item._id)} disabled={!Disable}/>
                                <BsEyeFill onClick={() => handleShow(item)}/>
                              </td> 
                            </tr>
                          </tbody>
                        );
                      })}
                    </>
                  )}
                </table>
              </ScrollContainer>
            </div>
          </div>
          <Pagination
          postsPerPage={postsPerPage}
          totalPosts={deletedrace.length}
          paginate={paginate}
        />
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
          <h2>Race Prize </h2>
        </Modal.Header> 
        <Modal.Body>
          <Prize data={modaldata} />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="modalClosebtn">
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showRacePopup}
        onHide={handleCloseRacePopup}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>  
          <h2 style={{fontFamily: "inter"}}>Race</h2>
        </Modal.Header>
        <Modal.Body>
          <RaceDetailPopup data={modaldataPopup} />
        </Modal.Body>
         <Modal.Footer>
          <button onClick={handleCloseRacePopup} className="modalClosebtn">
            Close
          </button>
        </Modal.Footer>
     
      </Modal>
    </>
  )
}

export default DeletedRace