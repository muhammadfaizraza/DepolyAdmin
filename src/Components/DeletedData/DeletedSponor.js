import React, { useEffect, Fragment, useState } from "react";
import { fetchdeletedsponsor, STATUSES } from "../../redux/getDeletedreducer/DeletedSponsorSlice";
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
import SponsorPopup from "../Popup/SponserPopup"

const DeletedSponor = () => {
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
    
     await axios.post(`${window.env.API_URL}/restoresoftdeletesponsor/${id}`, );
      // api 
      // button enable
      dispatch(fetchdeletedsponsor());
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
  
    const { data: deletedsponsor, status } = useSelector((state) => state.deletedsponsor);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8)
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = deletedsponsor.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
  
    useEffect(() => {
      dispatch(fetchdeletedsponsor());
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
            <h4>Sponsor Listings</h4>

            <div>
          

              <Link to="/sponsorform">
                <button>Add Sponsor</button>
              </Link>
            </div>
          </div>
          <div className="div_maintb">
            <ScrollContainer className="scroll-container">
              <table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title </th>
                    <th>Title Arabic</th>
                    <th>Description </th>
                    <th>Description Arabic</th>
                    <th>Url</th>
                    <th>Image</th>
                
                    
                    <th >Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.map((item, index) => {
                    return (
                      <>
                        <tr className="tr_table_class">
                          <td>{item.TitleEn}</td>
                          <td>{item.TitleAr}</td>
                          <td>{item.DescriptionEn}</td>
                          <td>{item.DescriptionAr}</td>
                          <td>{item.Url}</td>
                          <td>
                            <img
                              src={item.image}
                              alt=""
                              style={{
                                width: "30px",
                                height: "30px",
                              }}
                            />
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
        </div>
        <Pagination
        postsPerPage={postsPerPage}
        totalPosts={deletedsponsor.length}
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
        <h2>Sponsor </h2>
      </Modal.Header>
      <Modal.Body>
        <SponsorPopup data={modaldata} />
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

export default DeletedSponor