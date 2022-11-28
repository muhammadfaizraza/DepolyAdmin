import React, { useEffect, useState } from "react";
import { fetchrace, STATUSES } from "../../redux/getReducer/getRaceSlice";
import { fetchtobePublishRace } from "../../redux/getReducer/getToBePublishRace";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../redux/postReducer/postRace";
import { Link ,useNavigate } from "react-router-dom";
import "../../Components/CSS/Table.css";
import ScrollContainer from "react-indiana-drag-scroll";
import "../../Components/CSS/race.css";
import { Modal } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import Moment from "react-moment";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";

const Prize = (data) => {
  


(data, "FifthPrice");
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

  const [PublishRace, setPublishRace] = useState(false)
  

  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };
  
  const dispatch = useDispatch();
  const { data: race, status } = useSelector((state) => state.race);
  const { data: tobePublishRace } = useSelector((state) => state.tobePublishRace);

  const [AllRace, setAllRace] = useState(race)

  const handleRemove = async (Id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        dispatch(remove(Id));
      } else {
        swal("Your Data is safe!");
      }
    });
  };
  useEffect(() => {
    dispatch(fetchrace());
    dispatch(fetchtobePublishRace());
  }, [dispatch]);

  const handleAwaited = () => {
    setAllRace(tobePublishRace)
    setPublishRace(true)
  }
  const handleAll = () => {
    setAllRace(race)
  }
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
  


(race)
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
              <h4>Race Listings</h4>
              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <DropdownButton id="dropdown-basic-button" title="Filter">
                  <Dropdown.Item onClick={() => handleAll()}>Published</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleAwaited()}>Publish Awaited</Dropdown.Item>
                </DropdownButton>
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
                      <th>Racecource</th>
                      <th>Description</th>
                      <th>Description Arabic</th>
                      <th>Track Length</th>
                      <th>Weather in Degree</th>
                      <th>Weather Type</th>
                      <th>Day and Time</th>
                      {/* <th>Total Horses</th> */}
                      <th>Race Status</th>
                      <th>Prize Money</th>
                      <th>image</th>
                      
                      <th>Action</th>
                    </tr>
                  </thead>
                  {AllRace === undefined ? (
                    <h3
                      style={{
                        textAlign: "center",
                      }}
                    >
                      No Data
                    </h3>
                  ) : (
                    <>
                      {AllRace.map((item) => {
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
                                  }}
                                />{" "}
                              </td>
                              {/* {
                                PublishRace ? <td>
                                <button  className="Approvedbtn resultbtn" onClick={() => GoToPublish(item._id)}>Click</button>
                              </td>:null
                              } */}
                              <td>
                                <MdDelete
                                  onClick={() => handleRemove(item._id)}
                                />
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
    </>
  );
};
export default Races;
