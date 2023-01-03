import React, { useEffect, Fragment, useState } from "react";
import { fetchdeletedequipment, STATUSES } from "../../redux/getDeletedreducer/DeletedEquipmentSlice";
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
import EquipmentPopup from "../../Components/Popup/EquipmentPopup";
import { BsEyeFill } from "react-icons/bs";



const DeletedEquipment = () => {

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
  
   await axios.post(`${window.env.API_URL}/restoresoftdeleteequipment/${id}`, );
    // api 
    // button enable
    dispatch(fetchdeletedequipment());
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

  const { data: deletedequipment, status } = useSelector((state) => state.deletedequipment);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = deletedequipment.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  useEffect(() => {
    dispatch(fetchdeletedequipment());
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
    <Fragment>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Header ">
              <h4>Equipment Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >

                </h6>

                <Link to="/equipment">
                  <button>Add Equipment</button>
                </Link>
              </div>
            </div>
            <>
              <div className="div_maintb">
                <ScrollContainer>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Name Arabic </th>

                        <th>Short Code</th>

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

                              <td>{item.shortCode} </td>

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
              <Pagination
          postsPerPage={postsPerPage}
          totalPosts={deletedequipment.length}
          paginate={paginate}
        />
            </>
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
          <h2 style={{ fontFamily: "inter" }}>Equipment</h2>
        </Modal.Header>
        <Modal.Body>
          <EquipmentPopup data={modaldata} />
        </Modal.Body>

        <Modal.Footer>
          <button onClick={handleClose} className="modalClosebtn">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default DeletedEquipment