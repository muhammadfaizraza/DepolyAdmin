import React, { useEffect, Fragment, useState } from "react";
import { fetchdeletedracecard, STATUSES } from "../../redux/getDeletedreducer/DeletedRaceCardSlice";
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

import RacecoursePopup from "../Popup/RacecoursePopup";



const DeletedRaceCard = () => {
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
    
     await axios.post(`${window.env.API_URL}/restoresoftdeleteracecard/${id}`, );
      // api 
      // button enable
      dispatch(fetchdeletedracecard());
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
  
    const { data: deletedracecard, status } = useSelector((state) => state.deletedracecard);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8)
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = deletedracecard.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
  
    useEffect(() => {
      dispatch(fetchdeletedracecard());
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
              <h4>Race Card Listing</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

                <Link to="/racecard">
                  <button>Add Race Card</button>
                </Link>
              </div>
            </div>

            <div class="div_maintb">
              <ScrollContainer>
                <table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Race Card Name</th>
                      <th>Race Card Name Arabic </th>
                      <th>Race Course</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class">
                            <td>{item.RaceCardNameEn === null ? <>N/A</> : item.RaceCardNameEn }</td>
                            <td>{item.RaceCardNameAr === null ? <>N/A</> : item.RaceCardNameAr}</td>
                            <td>{item.RaceCardCourseData&& item.RaceCardCourseData.TrackNameEn }</td>                   
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
          </div>
          <Pagination
          postsPerPage={postsPerPage}
          totalPosts={deletedracecard.length}
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
          <h2 style={{fontFamily:"inter"}}> Race Course </h2>
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
  )
}

export default DeletedRaceCard