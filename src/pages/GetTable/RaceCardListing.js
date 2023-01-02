import React, { useEffect, useState } from "react";
import { fetchraceCard, STATUSES } from "../../redux/getReducer/getRaceCard";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import RacecoursePopup from "../../Components/Popup/RacecoursePopup";
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { BsEyeFill } from "react-icons/bs";
import Pagination from "./Pagination";
import { BiFilter } from "react-icons/bi";
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Racecourse = () => {
  const [ShowCalender, setShowCalender] = useState(false);

  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: raceCard, status } = useSelector((state) => state.raceCard);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = raceCard.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    dispatch(fetchraceCard());
  }, [dispatch]);

  const handleRemove = async (Id) => {
    try {
      swal({
        title: "Are you sure?",
        text: "do you want to delete this data ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        await axios.delete(`${window.env.API_URL}/softdeleteRaceCard/${Id}`);

        if (willDelete) {
          swal("Poof! Your data has been deleted!", {
            icon: "success",
          });
          dispatch(fetchraceCard());
        } else {
          swal("Your data is safe!");
        }
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
  if (status === STATUSES.LOADING) {
    <Lottie animationData={HorseAnimation} loop={true} className="Lottie" />;
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
              <h4>Race Card Listing</h4>

              <div>
                <Link to="/racecard">
                  <button>Add Race Card</button>
                </Link>
                <OverlayTrigger
                  overlay={<Tooltip id={`tooltip-top`}>Filter</Tooltip>}
                >
                  <span className="addmore">
                    <BiFilter
                      className="calendericon"
                      onClick={() => setShowCalender(!ShowCalender)}
                    />
                  </span>
                </OverlayTrigger>{" "}
                <CSVLink
                  data={raceCard}
                  separator={";"}
                  filename={"MKS Race Card.csv"}
                  className="csvclass"
                >
                  Export CSV
                </CSVLink>
              </div>
            </div>
            <div>
              {ShowCalender ? (
                <span className="transitionclass">
                  <div className="userfilter">
                    <div className="filtertextform forflex">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Title"
                      />
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Description"
                      />
                    </div>
                  </div>
                  <button className="filterbtn">Apply Filter</button>
                </span>
              ) : (
                <></>
              )}
            </div>

            <div class="div_maintb">
              <ScrollContainer>
                <table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Actions</th>
                      <th>Race Card Name</th>
                      <th>Race Card Name Arabic </th>
                      <th>Race Course</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class">
                            <td className="table_delete_btn1">
                              <BiEdit
                                onClick={() =>
                                  navigate("/editraceCard", {
                                    state: {
                                      RaceId: item,
                                    },
                                  })
                                }
                              />

                              <MdDelete
                                style={{
                                  fontSize: "22px",
                                }}
                                onClick={() => handleRemove(item._id)}
                              />
                              <BsEyeFill onClick={() => handleShow(item)} />
                            </td>
                            <td>
                              {item.RaceCardNameEn === null ? (
                                <>N/A</>
                              ) : (
                                item.RaceCardNameEn
                              )}
                            </td>
                            <td>
                              {item.RaceCardNameAr === null ? (
                                <>N/A</>
                              ) : (
                                item.RaceCardNameAr
                              )}
                            </td>
                            <td>
                              {item.RaceCardCourseData &&
                                item.RaceCardCourseData.TrackNameEn}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </ScrollContainer>
            </div>
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={raceCard.length}
            paginate={paginate}
            currentPage={currentPage}
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
          <h2 style={{ fontFamily: "inter" }}> Race Course </h2>
        </Modal.Header>
        <Modal.Body>
          <RacecoursePopup data={modaldata} />
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
export default Racecourse;
