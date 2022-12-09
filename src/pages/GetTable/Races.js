import React, { useEffect, useState } from "react";
import { fetchrace, STATUSES } from "../../redux/getReducer/getRaceSlice";
import { fetchtobePublishRace } from "../../redux/getReducer/getToBePublishRace";
import { useDispatch, useSelector } from "react-redux";
import { Link ,useNavigate } from "react-router-dom";
import "../../Components/CSS/Table.css";
import ScrollContainer from "react-indiana-drag-scroll";
import "../../Components/CSS/race.css";
import { Modal } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import Moment from "react-moment";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import RaceDetailPopup from "../../Components/Popup/RaceDetailPopup";
import { BsEyeFill } from "react-icons/bs";
import Pagination from './Pagination'

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

const Races = () => {
  const history = useNavigate();
  const [PublishRace, setPublishRace] = useState(true);

  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
;


  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };

  const [showRacePopup, setShowRacePopup] = useState(false);
  const [modaldataPopup, setmodaldataPopup] = useState();
  const handleCloseRacePopup = () => setShowRacePopup(false);
  const handleShowRacePopup = async (data) => {
    setmodaldataPopup(data);
    await setShowRacePopup(true);
  };
  
  const dispatch = useDispatch();
  const { data: race, status } = useSelector((state) => state.race);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)
 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = race.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(fetchrace());
    dispatch(fetchtobePublishRace());
  }, [dispatch]);
  const handleRemove = async (Id) => {
    try {
      const res = await axios.delete(`${window.env.API_URL}/softdeleterace/${Id}`)
      swal({
        title: "Success!",
        text: "Data has been Deleted successfully ",
        icon: "success",
        button: "OK",
      });
      dispatch(fetchrace());
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


  const GoToPublish = (RaceId) => {
    history("/publishrace", {
      state: {
        RaceId: RaceId,
      },
    });
  }
  if (status === STATUSES.LOADING) {
    return <Lottie animationData={HorseAnimation} loop={true}  className='Lottie'/>
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
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                </h6>
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
                      {
                        !PublishRace ? <th>Publish</th>: <></>
                      }
                      <th>Action</th>
                    </tr>
                  </thead>
                  {race === undefined ? (
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
                                {item.RaceNameModelData.NameEn}
                              </td>
                              <td>{item.RaceNameModelData.NameAr} </td>
                              <td>{item.RaceTypeModelData.NameEn} </td>
                              <td>
                                {item.RaceCourseData === null ? (
                                  <>N/A</>
                                ) : (
                                  item.RaceCourseData.TrackNameEn
                                )}
                              </td>
                              <td
                                style={{
                                  maxWidth: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.DescriptionEn}
                              </td>
                              <td
                                style={{
                                  maxWidth: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.DescriptionAr}
                              </td>
                              <td>{item.TrackLengthData.TrackLength}</td>
                              <td>{item.RaceAndHorseModelData.length}</td>
                              <td>{item.WeatherDegree}</td>
                              <td>{item.WeatherType}</td>
                              <td>
                                {" "}
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
                                {" "}
                                <img
                                  src={item.image}
                                  alt=""
                                  style={{
                                    width: "50px",
                                    height:'50px'
                                  }}
                                />{" "}
                              </td>
                              {
                                !PublishRace ? <td>
                                <button  className="Approvedbtn resultbtn" onClick={() => GoToPublish(item._id)}>Click</button>
                              </td>:null
                              }
                              <td
                                className="table_delete_btn1"
                                style={{ textAlign: "center" }}
                              >
                                <BiEdit
                                  onClick={() =>
                                    history("/editrace", {
                                      state: {
                                        fullraceid: item,
                                      },
                                    })
                                  }
                                />
                                <MdDelete
                                  onClick={() => handleRemove(item._id)}
                                />
                                <BsEyeFill onClick={() => handleShowRacePopup(item)} /> 
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
          totalPosts={race.length}
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

  );
};
export default Races;
