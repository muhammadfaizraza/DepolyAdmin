import React, { useEffect, Fragment, useState } from "react";
import { fetchdeletednews, STATUSES } from "../../redux/getDeletedreducer/DeletedNewsSlice";
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
import NewsPopup from "../Popup/NewsPopup";

const DeletedNews = () => {
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
    
     await axios.post(`${window.env.API_URL}/restoresoftdeletenews/${id}`, );
      // api 
      // button enable
      dispatch(fetchdeletednews());
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
  
    const { data: deletednews, status } = useSelector((state) => state.deletednews);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8)
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = deletednews.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
  
    useEffect(() => {
      dispatch(fetchdeletednews());
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
            <h4>News Listings</h4>

            <div>
              <h6
                style={{
                  marginRight: "100px",
                  alignItems: "center",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >

              </h6>

              <Link to="/newsform">
                <button>Add News</button>
              </Link>
            </div>
          </div>
          <>
            <div className="div_maintb">
              <ScrollContainer className="scroll-container">
                <table>
                  <thead>
                    <tr>
                      <th>Title </th>
                      <th>Sub Title </th>
                      <th>Title Arabic</th>
                      <th>Sub Title Arabic</th>
                      <th>Description </th>
                      <th>Description Arabic</th>
                      <th>Image</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((item, index) => {
                      return (
                        <tr className="tr_table_class" key={index}>
                          <td>{item.TitleEn}</td>
                          <td>{item.TitleAr}</td>

                          <td>{item.SecondTitleEn}</td>
                          <td>{item.SecondTitleAr}</td>

                          <td>{item.DescriptionEn}</td>
                          <td>{item.DescriptionAr}</td>
                          
                          <td>
                            <img src={item.image} alt="" />
                          </td>
                          <td className="table_delete_btn1">
                                <FaTrashRestoreAlt onClick={() => Restorefunction(item._id)} disabled={!Disable}/>
                                <BsEyeFill onClick={() => handleShow(item)}/>
                              </td>
                        </tr>
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
        totalPosts={deletednews.length}
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
        <h2>News </h2>
      </Modal.Header>
      <Modal.Body>
        <NewsPopup data={modaldata} />
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

export default DeletedNews