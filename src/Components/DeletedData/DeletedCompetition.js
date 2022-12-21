import React, { useEffect, Fragment,useState } from "react";
import { fetchdeletedcompetition, STATUSES } from "../../redux/getDeletedreducer/DeletedCompetitionSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import { BsEyeFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import Pagination from "../../pages/GetTable/Pagination";

import {FaTrashRestoreAlt} from "react-icons/fa" ;
import Moment from "react-moment";
import CompetitionPopup from "../Popup/CompetitionPopup";

const DeletedCompetition= () => {
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
    
     await axios.post(`${window.env.API_URL}/restoresoftdeletecompetition/${id}`, );
      // api 
      // button enable
      dispatch(fetchdeletedcompetition());
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
  
    const { data: deletedCompetition, status } = useSelector((state) => state.deletedCompetition);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8)
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = deletedCompetition.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
  
    useEffect(() => {
      dispatch(fetchdeletedcompetition());
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
            <h4>Competition Listings</h4>

            <div>
              <h6
                style={{
                  marginRight: "100px",
                  alignItems: "center",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                
              </h6>

              <Link to="/addcompetition">
                <button>Add Competition</button>
              </Link>
            </div>
          </div>
          <>
            <div className="div_maintb">
              <ScrollContainer>
                <table>
                  <thead>
                    <tr>
                      <th>Competition Name</th>
                      <th>Name Arabic </th>
                      <th>Competition Category </th>
                      <th>Competition Code</th>
                      <th>Description </th>
                      <th>Description Arabic</th>
                      <th>Short Code</th>
                      <th>Pick Count</th>
                      <th>Tri Count</th>
                      <th>Start Date </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class">
                            <td>{item.NameEn === null ? <>N/A</>: item.NameEn}</td>
                            <td>{item.NameAr === null ? <>N/A</>:item.NameAr}</td>
                            <td>{item.CompetitionCategory.NameEn&&  item.CompetitionCategoryData.NameEn}</td>
                            <td>{item.CompetitionCode === '' ? <>N/A</> : item.CompetitionCode}</td>
                            
                            <td>{item.DescEn}</td>
                            <td>{item.DescAr} </td>
                            <td>{item.shortCode}</td>
                            <td>{item.pickCount}</td>
                            <td>{item.TriCount}</td>
                            <td>
                              <Moment format="YYYY/MM/DD">
                                {item.StartDate}
                              </Moment>{" "}
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
        <span className="plusIconStyle"></span>
        <Pagination
        postsPerPage={postsPerPage}
        totalPosts={deletedCompetition.length}
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
        <h2>Competition </h2>
      </Modal.Header>
      <Modal.Body>
        <CompetitionPopup data={modaldata} />
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

export default DeletedCompetition;