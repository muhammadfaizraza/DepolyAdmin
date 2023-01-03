import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Modal } from "react-bootstrap";
import SliderPopup from "../../Components/Popup/SliderPopup";
import swal from "sweetalert";
import { fetchSlider, STATUSES } from "../../redux/getReducer/getSliderSlice";
import "../../Components/CSS/Table.css";
import { BsEyeFill, BsFillEyeFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import ScrollContainer from "react-indiana-drag-scroll";
import Pagination from "./Pagination";
import { Form } from "react-bootstrap";
import { BiFilter } from "react-icons/bi";
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { DateRangePicker } from 'react-date-range';

const Slider = () => {
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
  //For Modal
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);

  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };

  const dispatch = useDispatch();
  const [pagenumber, setPageNumber] = useState(1);

  const previousPageHandler = () => {
    setPageNumber((pagenumber) => pagenumber - 1);
  };
  const nextPageHandler = () => {
    setPageNumber((pagenumber) => pagenumber + 1);
  };
  const { data: slider, status } = useSelector((state) => state.slider);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = slider.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchSlider());
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
          await axios.delete(`${window.env.API_URL}/softdeleteSlider/${Id}`);
          swal(" Your data has been deleted Successfully!", {
            icon: "success",
          });
          dispatch(fetchSlider());
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
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Header ">
              <h4>Slider Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                ></h6>

                <Link to="/sliderform">
                  <button>Add Slider</button>
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
                  data={slider}
                  separator={";"}
                  filename={"MKS Slider.csv"}
                  className="csvclass"
                >
                  Export CSV
                </CSVLink>
              </div>
            </div>
            <div>
              <div>
                {ShowCalender ? (
                  <span className="transitionclass">
                    <div className="userfilter">
                      <div className="filtertextform forflex">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Title"
                        />
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Description"
                        />
                      </div>
                    </div>
                    <button className="filterbtn">Apply Filter</button>
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="div_maintb">
              <ScrollContainer className="scroll-container">
                <table striped bordered hover>
                  <thead>
                    <tr>
                    <th style={{ textAlign: "center" }}>Action</th>

                      <th>Title</th>
                      <th>Title Arabic </th>
                      <th>Url</th>
                      <th>Image</th>
                      {/* <th>Active</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class">
                          <td
                              className="table_delete_btn1"
                            >
                              <BiEdit
                                onClick={() =>
                                  history("/editslider", {
                                    state: {
                                      sliderid: item,
                                    },
                                  })
                                }
                              />
                              <MdDelete
                                onClick={() => handleRemove(item._id)}
                              />
                              <BsEyeFill onClick={() => handleShow(item)} />
                            </td>
                            <td>{item.TitleEn}</td>

                            <td>{item.TitleAr}</td>
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
                            {/* <td>
                                <Form.Check 
                                  type="switch"
                                  id="custom-switch"
                                  onChange={() => setValue(true)}
                      
                                  value={Value}
                                />
                                </td> */}

                           
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
            totalPosts={slider.length}
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
          <h2>Slider </h2>
        </Modal.Header>
        <Modal.Body>
          <SliderPopup data={modaldata} />
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

export default Slider;
