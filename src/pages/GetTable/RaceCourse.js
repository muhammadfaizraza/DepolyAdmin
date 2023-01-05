import React, { useEffect, useState } from "react";
import {
  fetchracecourse,
  STATUSES,
} from "../../redux/getReducer/getRaceCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
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
import { BiFilter } from "react-icons/bi";
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { DateRangePicker } from 'react-date-range';
import Form from "react-bootstrap/Form";

const Racecourse = () => {

  const [Value, setValue] = useState(false);

  const [ShowCalender, setShowCalender] = useState(false);
  const [SearchAge, setSearchAge] = useState('');
  const [SearchCode, setSearchCode] = useState('');
  const [SearchTitle, setSearchTitle] = useState('');
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: racecourse, status } = useSelector((state) => state.racecourse);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = racecourse.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const GetSearch = async () => {
    dispatch(fetchracecourse({SearchTitle,SearchCode,SearchAge}));
    setSearchTitle('')
    setSearchCode('')
    setSearchAge('')
  };
  useEffect(() => {
    dispatch(fetchracecourse({SearchTitle,SearchCode,SearchAge}));
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

  
   
        if (willDelete) {
          
        await axios.delete(`${window.env.API_URL}/softdeletecourse/${Id}`)
          swal("Your data has been deleted Successfully!", {
            icon: "success",
         
          }
          )
          dispatch(fetchracecourse({SearchTitle,SearchCode,SearchAge}));
          
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
    <Lottie animationData={HorseAnimation} loop={true} className="Lottie" />;
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
          
                <Link to="/racecourseform">
                  <button>Add Race Cource</button>
                </Link>
                <OverlayTrigger
                  overlay={<Tooltip id={`tooltip-top`}>Filter</Tooltip>}
                >
                  <span className="addmore">
                    <BiFilter
                      className="calendericon"
                      onClick={() => setShowCalender(!ShowCalender)}
                    />
                  </span>
                </OverlayTrigger>{" "}
                <CSVLink
                  data={racecourse}
                  separator={";"}
                  filename={"MKS Race Course.csv"}
                  className="csvclass"
                >
                  Export CSV
                </CSVLink>
              </div>
            </div>
            <div>
              {ShowCalender ? (
                <span className="transitionclass">
                <div className="userfilter">
                
                <div className="filtertextform forflex">
                
                <input
                       type="text"
                       class="form-control"
                       onChange={(e) => setSearchTitle(e.target.value)}
                       placeholder="Enter Name"
                     />
                     <input
                       type="text"
                       class="form-control"
                       onChange={(e) => setSearchAge(e.target.value)}
                       placeholder="Enter Abbreviation"
                     />
                     <input
                       type="text"
                       class="form-control"
                       onChange={(e) => setSearchCode(e.target.value)}
                       placeholder="Enter Short Code"
                     />
                 </div>
                
                </div>
                <button className="filterbtn" onClick={GetSearch}>
                   Apply Filter
                 </button>
                 </span>
              ) : (
                <></>
              )}
            </div>
            <div class="div_maintb">
              <ScrollContainer>
                <table striped bordered hover>
                  <thead>
                    <tr>
                    <th>Actions</th>

                      <th>Race Course Name</th>
                      <th>Race Course Arabic </th>
                      <th>Abbreviation</th>
                      <th>Abbreviation Arabic</th>
                  
                      <th>Nationality</th>
                      <th>Color</th>
                      <th>Short Code</th>

                      <th>Image</th>

                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class">
                          <td className="table_delete_btn1">
                              <BiEdit
                                onClick={() =>
                                  navigate("/editracecourse", {
                                    state: {
                                      courseid: item,
                                    },
                                  })
                                }
                              />

                              <MdDelete
                                style={{
                                  fontSize: "22px",
                                }}
                                onClick={() => handleRemove(item._id)}
                              />
                              <BsEyeFill onClick={() => handleShow(item)} />
                            </td>
                            <td>
                              {item.TrackNameEn === null ? (
                                <>N/A</>
                              ) : (
                                item.TrackNameEn
                              )}
                            </td>
                            <td>
                              {item.TrackNameAr === null ? (
                                <>N/A</>
                              ) : (
                                item.TrackNameAr
                              )}
                            </td>
                            <td>
                              {item.AbbrevEn === null ? (
                                <>N/A</>
                              ) : (
                                <>{item.AbbrevEn}</>
                              )}
                            </td>
                            <td>
                              {item.AbbrevAr === null ? (
                                <>N/A</>
                              ) : (
                                <>{item.AbbrevAr}</>
                              )}
                            </td>
                            <td>
                              {item.NationalityDataRaceCourse === null ? (
                                <>N/A</>
                              ) : (
                                <>{item.NationalityDataRaceCourse.NameEn}</>
                              )}
                            </td>
                            <td>
                              {item.ColorCodeData === null ? (
                                <>N/A</>
                              ) : (
                                item.ColorCodeData.NameEn
                              )}
                            </td>
                            <td>{item.shortCode} </td>
                            <td>
                              <img src={item.image} alt="" />
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
          <h2 style={{ fontFamily: "inter" }}> Race Course </h2>
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
