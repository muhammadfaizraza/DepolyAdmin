import React, { useEffect, Fragment, useState } from "react";
import { fetchdeletednationality, STATUSES } from "../../redux/getDeletedreducer/DeletedNationalitSlice";
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
import NationalityPopup from "../Popup/NationalityPopup";



const DeletedNationality = () => {
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
    
     await axios.post(`${window.env.API_URL}/restoresoftdeletenationality/${id}`, );
      // api 
      // button enable
      dispatch(fetchdeletednationality());
      setDisable(true)
      swal({
        title: "Success!",
        text: "Data has been restored successfully ",
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
  
    const { data: deletednationality, status } = useSelector((state) => state.deletednationality);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8)
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = deletednationality.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
  
    useEffect(() => {
      dispatch(fetchdeletednationality());
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
              <h4>Nationality Listings</h4>

              <div>
           

                <Link to="/nationality">
                  <button>Add Nationality</button>
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
                        <th>Alternative Name </th>
                        <th>Alternative Name Arabic</th>

                        <th>Abbreviation</th>
                        <th>Abbreviation Arabic</th>
                        <th>Short Code</th>
                        <th>Label</th>
                        <th>Label Arabic</th>
                        <th>Off Set </th>

                        <th>Value</th>
                        <th>Value Arabic</th>

                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((item, index) => {
                        return (
                          <>
                            <tr key={index} className="tr_table_class">
                              <td>{item.NameEn}</td>
                              <td>{item.NameAr}</td>
                              <td>{item.AltNameEn}</td>
                              <td>{item.AltNameAr}</td>
                              <td>{item.AbbrevEn}</td>
                              <td>{item.AbbrevAr}</td>
                              <td>{item.shortCode} </td>
                              <td>{item.LabelEn} </td>
                              <td>{item.LabelAr} </td>
                              <td>{item.Offset === 'true' ? <>True</> : <>False</>} </td>
                              <td>{item.ValueEn}</td>
                              <td>{item.ValueAr}</td>

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
          <span className="plusIconStyle"></span>
          <Pagination
          postsPerPage={postsPerPage}
          totalPosts={deletednationality.length}
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
          <h2 style={{fontFamily: "inter"}}>Nationality</h2>
        </Modal.Header>
        <Modal.Body>
          <NationalityPopup data={modaldata} />
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

export default DeletedNationality