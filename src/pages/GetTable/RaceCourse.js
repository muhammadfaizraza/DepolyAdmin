import React, { useEffect, useState } from "react";

import {
  fetchracecourse,
  STATUSES,
} from "../../redux/getReducer/getRaceCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { remove } from "../../redux/postReducer/PostRaceCourse";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import RacecoursePopup from "../../Components/Popup/RacecoursePopup";
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { BsEyeFill } from "react-icons/bs";
import Pagination from "./Pagination";
import { BiFilter } from 'react-icons/bi';
import { CSVLink } from "react-csv";



const Racecourse = () => {
  const [ShowCalender, setShowCalender] = useState(false)

  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { data: racecourse, status } = useSelector((state) => state.racecourse);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = racecourse.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(fetchracecourse());
  }, [dispatch]);


  const handleRemove = async (Id) => {
    try {
      swal({
        title: "Are you sure?",
        text: "do you want to delete this data ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })

      .then( async(willDelete) => {
        const res = await axios.delete(`${window.env.API_URL}/softdeletecourse/${Id}`)
   
        if (willDelete) {
          swal("Your data has been deleted Successfully!", {
            icon: "success",
         
          }
          )
          dispatch(fetchracecourse())
          
        } else {
          swal("Your data is safe!");
        }
      });
   
    }catch(error) {

      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }



  }
  

  if (status === STATUSES.LOADING) {
    <Lottie animationData={HorseAnimation} loop={true}  className='Lottie'/>
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
              <h4>Race Course Listing</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

                <Link to="/racecourseform">
                  <button>Add Race Cource</button>
                </Link>
                <BiFilter className="calendericon" onClick={() => setShowCalender(!ShowCalender)}/>
                  <CSVLink  data={racecourse}  separator={";"} filename={"MKS Race Course.csv"} className='csvclass'>
                        Export CSV
                    </CSVLink>
              </div>
            </div>

            <div class="div_maintb">
              <ScrollContainer>
                <table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Track Name</th>
                      <th>Track Name Arabic </th>
                      <th>Nationality</th>
                      <th>Color Code</th>
                      <th>Short Code</th>

                      <th>Image</th>

                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class">
                            <td>{item.TrackNameEn === null ? <>N/A</> : item.TrackNameEn }</td>
                            <td>{item.TrackNameAr === null ? <>N/A</> : item.TrackNameAr}</td>
                            <td>{item.NationalityDataRaceCourse.NameEn === null ? <>N/A</> : item.NationalityDataRaceCourse.NameEn}</td>
                            <td>{item.ColorCodeData === null ? <>N/A</> : item.ColorCodeData.NameEn}</td>
                            <td>{item.shortCode} </td>
                            <td>
                              <img src={item.image} alt="" />
                            </td>
                            <td className="table_delete_btn1">
                            <BiEdit   onClick={() => navigate('/editracecourse',{
                                state:{
                                  courseid:item
                                }
                              })}/>
                              
                              <MdDelete
                                style={{
                                  fontSize: "22px",
                                }}
                                onClick={() => handleRemove(item._id)}
                              />
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
          totalPosts={racecourse.length}
          paginate={paginate}
          currentPage={currentPage}

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
  );
};
export default Racecourse;
