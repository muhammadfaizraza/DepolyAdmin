import React, { useEffect, useState } from "react";
import { fetchTrainer, STATUSES } from "../../redux/getReducer/getTrainerSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { remove } from "../../redux/postReducer/PostTrainer";
import { Link ,useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import TrainerPopup from "../../Components/Popup/TrainerPopup";
import { BsFillEyeFill } from "react-icons/bs";
import ScrollContainer from "react-indiana-drag-scroll";
import Moment from "react-moment";
import swal from "sweetalert";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import Pagination from "./Pagination";

const Trainer = () => {
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: trainer, status } = useSelector((state) => state.trainer);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = trainer.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(fetchTrainer());
  }, []);
  const handleRemove = async (Id) => {
    try {
      const res = await axios.delete(`${window.env.API_URL}/softdeletetrainer/${Id}`)
      swal({
        title: "Success!",
        text: "Data has been Deleted successfully ",
        icon: "success",
        button: "OK",
      });
      dispatch(fetchTrainer());
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
  const dob = new Date().toLocaleString();
  const age = " 2022-11-14T00:00:00.000Z";

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
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

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
                        <th>Detail</th>
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
                                {item.Remarks}
                              </td>
                              <td
                                style={{
                                  maxWidth: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.Detail}
                              </td>
                              <td>
                                <img src={item.image} alt="" />
                              </td>
                              <td className="table_delete_btn1"
                              style={{ textAlign: "center" }}>
                            <BiEdit
                                onClick={() =>
                                  navigate("/edittrainer", {
                                    state: {
                                      trainerid: item,
                                    },
                                  })
                                }
                              />
                              <MdDelete
                                onClick={() => handleRemove(item._id)}
                              />
                              <BsEyeFill onClick={() => handleShow(item) }/>
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
          totalPosts={trainer.length}
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
          <h2 style={{fontFamily:"inter"}}>Trainer </h2>
        </Modal.Header>
        <Modal.Body>
          <TrainerPopup data={modaldata} />
        </Modal.Body>
        <Modal.Footer>
        <button onClick={handleClose} className="modalClosebtn">Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Trainer;
