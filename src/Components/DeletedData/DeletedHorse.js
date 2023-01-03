import React, { useEffect, Fragment, useState } from "react";
import {
  fetchdeletedhorse,
  STATUSES,
} from "../../redux/getDeletedreducer/DeletedHorseSlice";
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

import HorsePopup from "../Popup/HorsePopup";

const DeletedHorse = () => {
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
  
   await axios.post(`${window.env.API_URL}/restoresoftdeletehorse/${id}`, );
    // api 
    // button enable
    dispatch(fetchdeletedhorse());
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

  const { data: deletedhorse, status } = useSelector((state) => state.deletedhorse);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = deletedhorse.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  useEffect(() => {
    dispatch(fetchdeletedhorse());
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
              <h4>Horse Listings</h4>

              <div>
                <Link to="/horseform">
                  <button>Add Horse</button>
                </Link>
              </div>
            </div>
            <>
              <div className="div_maintb">
                <ScrollContainer className="scroll-container">
                  <table id="customers">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Name Arabic</th>
                        <th>Age</th>
                        <th>Sex</th>
                        <th>Color</th>
                        <th>Purchase Price</th>
                        <th>Breeder</th>
                        {/* <th>Active Owner</th>
                      <th>Over All Rating</th> */}
                        {/* <th>Dam</th>
                      <th>Sire</th>
                      <th>GSire</th> */}
                        <th>Remarks</th>

                        <th>Rds</th>
                        {/* <th>Cap</th> */}

                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    {currentPosts.map((item) => {
                      return (
                        <>
                          <tbody>
                            <tr>
                              <td>{item.NameEn}</td>
                              <td>{item.NameAr}</td>
                              <td>
                                <Moment fromNow ago>
                                  {item.DOB}
                                </Moment>
                              </td>

                              <td>{item.SexModelData ===undefined ? <>N/A</>:<>{item.SexModelData.NameEn}</>}</td>

                              <td>
                                {item.ColorIDData === undefined ? (
                                  <>N/A</>
                                ) : (
                                  item.ColorIDData.NameEn
                                )}{" "}
                              </td>
                              {/* <td>{item.KindOfHorse === '' ? <>N/A</>: item.KindOfHorse}</td> */}
                              <td>{item.PurchasePrice}</td>
                              <td>
                                {
                                  item.BreederData&& 
                                  item.BreederData.NameEn
                                }
                              </td>
                              <td className="cell">{item.Remarks}</td>
                              {/* <td>
                              {item.OwnerModels === undefined ? (
                                <>No Data</>
                              ) : (
                                <>{item.OwnerModels.map((data) => data.NameEn)}</>
                              )}
                            </td> */}
                              <td>{item.Rds === true ? <>Yes</> : <>No</>}</td>

                              {/* <td>{item.DamData.NameEn === undefined ? <>N/A</>: <> {item.DamData.NameEn}</>}</td> */}
                              {/* <td>{item.SireData.NameEn}</td>
                            <td>{item.GSireData.NameEn}</td> */}
                              {/* <td>{item.Remarks}</td> */}
                              {/* <td>{item.PurchasePrice}</td> */}
                              {/* <td>{item.Rds}</td> */}
                              {/* <td>{item.Cap}</td> */}
                              <td>
                                <img
                                  src={item.HorseImage}
                                  alt=""
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                  }}
                                ></img>
                              </td>
                              <td className="table_delete_btn1">
                                <FaTrashRestoreAlt onClick={() => Restorefunction(item._id)} disabled={!Disable}/>
                                <BsEyeFill onClick={() => handleShow(item)}/>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </ScrollContainer>
              </div>
            </>
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={deletedhorse.length}
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
          <h2>Horse </h2>
        </Modal.Header>
        <Modal.Body>
          <HorsePopup data={modaldata} />
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

export default DeletedHorse;
