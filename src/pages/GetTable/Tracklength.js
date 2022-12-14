import React, { useEffect, Fragment, useState } from "react";
import {
  fetchTrackLength,
  STATUSES,
} from "../../redux/getReducer/getTracklength";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ScrollContainer from "react-indiana-drag-scroll";

import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import TrackLengthPopup from "../../Components/Popup/TrackLengthPopup";
import { Modal } from "react-bootstrap";
import Pagination from "./Pagination";
import { BiFilter } from "react-icons/bi";
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { DateRangePicker } from 'react-date-range';
import Form from "react-bootstrap/Form";

const Tracklength = () => {
  const [ShowCalender, setShowCalender] = useState(false);

  const [SearchCode, setSearchCode] = useState('');
  const [SearchTitle, setSearchTitle] = useState('');
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [Value, setValue] = useState(false);

  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: trackLength, status } = useSelector(
    (state) => state.trackLength
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = trackLength.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const GetSearch = async () => {
    dispatch(fetchTrackLength({SearchTitle,SearchCode}));
    setSearchTitle('')
    setSearchCode('')
  };

  useEffect(() => {
    dispatch(fetchTrackLength({SearchTitle,SearchCode}));
  }, []);

  const handleRemove = async (Id) => {
    try {
      swal({
        title: "Are you sure?",
        text: "do you want to delete this data ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await axios.delete(
            `${window.env.API_URL}/softdeleteTrackLength/${Id}`
          );
          swal("Your data has been deleted Successfully!", {
            icon: "success",
          });
          dispatch(fetchTrackLength({SearchTitle,SearchCode}));
        } else {
          swal("Your data is safe!");
        }
      });
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
              <h4>Track Length Listings</h4>

              <div>
          

                <Link to="/tracklengthform">
                  <button>Add Track Length</button>
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
                </OverlayTrigger>
                <CSVLink
                  data={trackLength}
                  separator={";"}
                  filename={"MKS Track Length.csv"}
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
                        placeholder="Enter Track Length"
                        onChange={(e) => setSearchTitle(e.target.value)}
                      />
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Race Course"
                        onChange={(e) => setSearchCode(e.target.value)}
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
            <>
              <div className="div_maintb">
                <ScrollContainer>
                  <table>
                    <thead>
                      <tr>
                      <th>Action</th>

                        <th>Track Length</th>
                        <th>Race Course </th>
                        <th>Rail Position</th>
                        <th>Ground Type</th>
                        <th>Race Course Image</th>
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
                                    navigate("/edittrack", {
                                      state: {
                                        trackid: item,
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
                              <td>{item.TrackLength}</td>
                              <td>
                                {item.TrackLengthRaceCourseData === null ||
                                undefined ? (
                                  <>N/A</>
                                ) : (
                                  <>
                                    {item.TrackLengthRaceCourseData.TrackNameEn}
                                  </>
                                )}
                              </td>
                              <td>{item.RailPosition}</td>
                              <td>
                                {item.GroundTypeModelData === null ||
                                undefined ? (
                                  <>N/A</>
                                ) : (
                                  <>
                                    {item.GroundTypeModelData.NameEn}
                                  </>
                                )}
                              </td>
                              <td>
                              
                                <img src={item.RaceCourseImage} alt="" />
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
            totalPosts={trackLength.length}
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
          <h2 style={{ fontFamily: "inter" }}>TrackLength </h2>
        </Modal.Header>
        <Modal.Body>
          <TrackLengthPopup data={modaldata} />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="modalClosebtn">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Tracklength;
