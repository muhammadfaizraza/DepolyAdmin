import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../../redux/postReducer/postRace";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../../Components/CSS/Table.css";
import ScrollContainer from "react-indiana-drag-scroll";
import "../../../Components/CSS/race.css";
import { Modal } from "react-bootstrap";
import RacePopup from "../../../Components/Popup/RacePopup";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import Moment from "react-moment";
import { fetchResult ,STATUSES } from "../../../redux/getReducer/getResultSlice";
import Lottie from "lottie-react";
import HorseAnimation from "../../../assets/horselottie.json";
const Races = () => {

  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { data: Result, status } = useSelector((state) => state.Result);
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
    dispatch(fetchResult());
  }, []);
  
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
              <h4>Result Awaited</h4>
              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

               
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
                      <th>image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {Result === undefined ? (
                    <h3
                      style={{
                        textAlign: "center",
                      }}
                    >
                      No Data
                    </h3>
                  ) : (
                    <>
                      {Result.map((item) => {
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
                              <td>
                                {item.TrackLengthData.TrackLength}
                              </td>

                              <td>{item.WeatherDegree}</td>
                              <td>{item.WeatherType}</td>
                              <td> <Moment parse="YYYY-MM-DD HH:mm">
                              {item.DayNTime}
                             </Moment></td>
                             {/* <td>{item.HorseModel}</td> */}
                              {/* <td>{item.Horses.length}</td> */}
                              <td>{item.RaceStatus}</td>
                              <td>
                                {" "}
                                <img src={item.image} alt=""  style={{
                                  width:"50px"
                                }}/>{" "}
                              </td>
                              <td>
                               <button className="Approvedbtn resultbtn"  onClick={() => navigate('/resultform')}> Add Result</button>
                                {/* <MdDelete
                                  onClick={() => handleRemove(item._id)}
                                /> */}
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
          <h2>Race Course </h2>
        </Modal.Header>
        <Modal.Body>
          <RacePopup data={modaldata} />
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
