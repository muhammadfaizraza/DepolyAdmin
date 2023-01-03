import React, { useEffect, Fragment, useState } from "react";
import {
  fetchdeletedtrainer,
  STATUSES,
} from "../../redux/getDeletedreducer/DeletedTrainerSlice";
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
import TrainerPopup from "../Popup/TrainerPopup";

const DeletedTrainer = () => {
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

      await axios.post(`${window.env.API_URL}/restoresoftdeletetrainer/${id}`);
      // api
      // button enable
      dispatch(fetchdeletedtrainer());
      setDisable(true);
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
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

  const { data: deletedtrainer, status } = useSelector(
    (state) => state.deletedtrainer
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = deletedtrainer.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(fetchdeletedtrainer());
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
            {" "}
            <div className="Header ">
              <h4>Trainer Listings</h4>

              <div>
            

                <Link to="/trainerform">
                  <button>Add Trainer</button>
                </Link>
              </div>
            </div>
            <>
              <div className="div_maintb">
                <ScrollContainer className="scroll-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Name Arabic</th>
                        <th>Age</th>
                        <th>Title</th>
                        <th>Title Arabic</th>
                        {/* <th>Date Of Birth</th> */}
                        <th>Licence Date</th>
                        <th>Short Name</th>
                        <th>Short Name Arabic </th>
                        {/* <th>Rating</th> */}

                        <th>Remarks</th>
                        <th>Remarks Arabic</th>
                        <th>Detail</th>
                        <th>Detail Arabic</th>
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
                              <td>
                                {" "}
                                <Moment fromNow ago>
                                  {item.DOB}
                                </Moment>
                              </td>
                              <td>{item.TitleEn}</td>
                              <td>
                                {item.TitleAr === "" ? <>N/A</> : item.TitleAr}
                              </td>

                              {/* <td>{item.DOB} </td> */}
                              <td>
                                {" "}
                                <Moment format="YYYY/MM/DD">
                                  {item.TrainerLicenseDate}
                                </Moment>
                              </td>
                              <td>{item.ShortNameEn}</td>
                              <td>
                                {item.ShortNameAr === "" ? (
                                  <>N/A</>
                                ) : (
                                  item.ShortNameAr
                                )}{" "}
                              </td>

                              {/* <td>{item.Rating}</td> */}
                              <td
                                style={{
                                  maxWidth: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.RemarksEn}
                              </td>
                              <td
                                style={{
                                  maxWidth: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.RemarksAr}
                              </td>
                              <td
                                style={{
                                  maxWidth: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.DetailEn}
                              </td>
                              <td
                                style={{
                                  maxWidth: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.DetailAr}
                              </td>
                              <td>
                                <img src={item.image} alt="" />
                              </td>
                              <td className="table_delete_btn1">
                                <FaTrashRestoreAlt onClick={() => Restorefunction(item._id)} disabled={!Disable}/>
                                <BsEyeFill onClick={() => handleShow(item)}/>
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
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={deletedtrainer.length}
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
          <h2 style={{ fontFamily: "inter" }}>Trainer </h2>
        </Modal.Header>
        <Modal.Body>
          <TrainerPopup data={modaldata} />
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

export default DeletedTrainer;
