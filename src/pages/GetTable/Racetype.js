import React, { useEffect, Fragment, useState } from "react";
import { fetchRaceType, STATUSES } from "../../redux/getReducer/getRacetype";
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
import RaceTypepopup from "../../Components/Popup/RaceTypepopup";
import { Modal } from "react-bootstrap";
import Pagination from "./Pagination";
import { BiFilter } from "react-icons/bi";
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { DateRangePicker } from 'react-date-range';
import Form from "react-bootstrap/Form";

const Racetype = () => {
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
  const history = useNavigate();

  const { data: RaceType, status } = useSelector((state) => state.RaceType);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = RaceType.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const GetSearch = async () => {
    dispatch(fetchRaceType({SearchTitle,SearchCode}));
    setSearchTitle('')
    setSearchCode('')
  };
  useEffect(() => {
    dispatch(fetchRaceType({SearchTitle,SearchCode}));
  }, [dispatch]);

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
          await axios.delete(`${window.env.API_URL}/softdeleteRaceType/${Id}`);
          swal(" Your data has been deleted Successfully!", {
            icon: "success",
          });
          dispatch(fetchRaceType({SearchTitle,SearchCode}));
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
              <h4>Race Type Listings</h4>

              <div>
           

                <Link to="/racetypeform">
                  <button>Add Race Type</button>
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
                  data={RaceType}
                  separator={";"}
                  filename={"MKS Race Type.csv"}
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
            <>
              <div className="div_maintb">
                <ScrollContainer>
                  <table>
                    <thead>
                      <tr>
                      <th>Action</th>

                        <th>Name</th>
                        <th>Name Arabic </th>

                        <th>Short Code</th>

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
                                    history("/editracetype", {
                                      state: {
                                        racetypeid: item,
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
                              <td>{item.NameEn}</td>
                              <td>{item.NameAr}</td>

                              <td>{item.shortCode} </td>

                              
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
            totalPosts={RaceType.length}
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
          <h2 style={{ fontFamily: "inter" }}>Race Type</h2>
        </Modal.Header>
        <Modal.Body>
          <RaceTypepopup data={modaldata} />
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

export default Racetype;
