import React, { useEffect, useState } from "react";
import { fetchSponsor, STATUSES } from "../../redux/getReducer/getSponsorSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import ScrollContainer from "react-indiana-drag-scroll";
import SponserPopup from "../../Components/Popup/SponserPopup";
import { Modal } from "react-bootstrap";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { BsEyeFill } from "react-icons/bs";
import Pagination from "./Pagination";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { BiFilter } from "react-icons/bi";
import { CSVLink } from "react-csv";
import {Form} from "react-bootstrap";
import { DateRangePicker } from 'react-date-range';

const News = () => {
  const [Value , setValue] = useState(false)
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
  const navigate = useNavigate();
  const { data: sponsor, status } = useSelector((state) => state.sponsor);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sponsor.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const GetSearch = async () => {
    dispatch(fetchSponsor({SearchTitle,SearchCode}));
    setSearchTitle('')
    setSearchCode('')
  };

  useEffect(() => {
    dispatch(fetchSponsor({SearchTitle,SearchCode}));
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
          await axios.delete(`${window.env.API_URL}/softdeletesponsor/${Id}`);
          swal("Your data has been deleted Successfully!", {
            icon: "success",
          });
          dispatch(fetchSponsor({SearchTitle,SearchCode}));
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
              <h4>Sponsor Listings</h4>

              <div>
                <Link to="/sponsorform">
                  <button>Add Sponsor</button>
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
                  data={sponsor}
                  separator={";"}
                  filename={"MKS sponsor.csv"}
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
                              placeholder="Enter Title"
                            />
                           
                            <input
                              type="text"
                              class="form-control"
                              onChange={(e) => setSearchCode(e.target.value)}
                              placeholder="Enter Description"
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
            <div className="div_maintb">
              <ScrollContainer className="scroll-container">
                <table striped bordered hover>
                  <thead>
                    <tr>
                    <th style={{ textAlign: "center" }}>Action</th>

                      <th>Title </th>
                      <th>Title Arabic</th>
                      <th>Description </th>
                      <th>Description Arabic</th>
                      <th>Url</th>
                      <th>Image</th>
                      <th>Active</th>

                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class">
                          <td
                              className="table_delete_btn1"
                              // style={{ textAlign: "center" }}
                            >
                              <BiEdit
                                onClick={() =>
                                  navigate("/editsponsor", {
                                    state: {
                                      sponsorid: item,
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
                            <td>
                                <Form.Check 
                                  type="switch"
                                  id="custom-switch"
                                  onChange={() => setValue(true)}
                                  // label="Check this switch"
                                  value={Value}
                                />
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
            totalPosts={sponsor.length}
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
          <h2>Sponsor </h2>
        </Modal.Header>
        <Modal.Body>
          <SponserPopup data={modaldata} />
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
export default News;
