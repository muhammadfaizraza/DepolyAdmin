import React, { useEffect,  useState } from "react";
import {
  fetchdeletedjockey,
  STATUSES,
} from "../../redux/getDeletedreducer/DeletedJockeySlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import Pagination from "../../pages/GetTable/Pagination";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import Moment from "react-moment";
import JockeyPopup from "../Popup/JockeyPopup";

const DeletedJockey = () => {
  const [Disable, setDisable] = useState(true);
  //for Modal
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };
  const Restorefunction = async (id) => {
    try {
      //buttons disable
      setDisable(false);

      await axios.post(`${window.env.API_URL}/restoresoftdeletejockey/${id}`);
      // api
      // button enable
      dispatch(fetchdeletedjockey());
      setDisable(true);
      swal({
        title: "Success!",
        text: "Data has been restored successfully ",
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
  const dispatch = useDispatch();

  const { data: deletedjockey, status } = useSelector(
    (state) => state.deletedjockey
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = deletedjockey.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(fetchdeletedjockey());
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
              <h4>Jockey Listings</h4>

              <div>
           

                <Link to="/jockeyform">
                  <button>Add Jockey</button>
                </Link>
              </div>
            </div>
            <>
              <div className="div_maintb">
                <ScrollContainer>
                  <table>
                    <thead>
                      <tr>
                        <th>Jockey Name</th>
                        <th>Name Arabic </th>
                        <th>Short Name </th>
                        <th>Short Name Arabic</th>
                        <th>Age</th>
                        <th>Rating</th>
                        <th>License Date </th>
                        <th>Remarks</th>
                        <th>Remarks Arabic </th>
                        <th>Min Weight</th>
                        <th>Max Weight</th>

                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((item, index) => {
                        return (
                          <>
                            <tr className="tr_table_class">
                              <td>{item.NameEn}</td>
                              <td>{item.NameAr}</td>
                              <td>{item.ShortNameEn}</td>
                              <td>
                                {item.ShortNameAr === "" ? (
                                  <>N/A</>
                                ) : (
                                  item.ShortNameAr
                                )}
                              </td>
                              <td>
                                {" "}
                                <Moment fromNow ago>
                                  {item.DOB}
                                </Moment>
                              </td>
                              <td>{item.Rating} </td>

                              <td>
                                <Moment format="YYYY/MM/DD">
                                  {item.JockeyLicenseDate}
                                </Moment>{" "}
                              </td>
                              <td>{item.RemarksEn}</td>
                              <td>{item.RemarksAr} </td>
                              <td>{item.MiniumumJockeyWeight} KG</td>
                              <td>{item.MaximumJockeyWeight} KG</td>

                              <td>
                                <img src={item.image} alt="" />
                              </td>
                              <td className="table_delete_btn1">
                                <FaTrashRestoreAlt
                                  onClick={() => Restorefunction(item._id)}
                                  disabled={!Disable}
                                />
                                <BsEyeFill onClick={() => handleShow(item)} />
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </ScrollContainer>
              </div>
            </>
          </div>
          <span className="plusIconStyle"></span>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={deletedjockey.length}
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
          <h2>Jockey </h2>
        </Modal.Header>
        <Modal.Body>
          <JockeyPopup data={modaldata} />
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

export default DeletedJockey;
