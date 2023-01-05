import React, { useEffect, useState } from "react";
import { fetchjockey, STATUSES } from "../../redux/getReducer/getJockeySlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import swal from "sweetalert";
import JockeyPopup from "../../Components/Popup/JockeyPopup";
import { Modal } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import ScrollContainer from "react-indiana-drag-scroll";
import Moment from "react-moment";
import axios from "axios";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import Pagination from "./Pagination";
import { BiFilter } from 'react-icons/bi';
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { DateRangePicker } from 'react-date-range';
import Form from "react-bootstrap/Form";


const Statistic = () => {
  const [Value, setValue] = useState(false);

  const [SearchData, setSearchData] = useState([]);
  const [ShowCalender, setShowCalender] = useState(false)
  const [SearchNameEn, setSearchNameEn] = useState('');
  const [SearchRating, setSearchRating] = useState('');


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
  const { data: jockey, status } = useSelector((state) => state.jockey);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = jockey.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const GetSearch = async () => {
    // const response = await axios.get(
    //   `${window.env.API_URL}/SearchJockey?NameEn=${SearchNameEn}&MiniumumJockeyWeight=${SearchMinimumJockeyWeight}&MaximumJockeyWeight=${SearchMaximumJockeyWeight}&Rating=${SearchRating}`
    // );
    // setSearchData(response.data.data);
    dispatch(fetchjockey({SearchRating,SearchNameEn}));
    setSearchNameEn('')  
  setSearchRating('')




  };

  useEffect(() => {
    dispatch(fetchjockey({SearchRating,SearchNameEn}));
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
           await axios.delete(`${window.env.API_URL}/softdeleteJockey/${Id}`)
          swal(" Your data has been deleted Successfully!", {
            icon: "success",
         
          }
          )
          dispatch(fetchjockey())
          
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
    return <Lottie animationData={HorseAnimation} loop={true}  className='Lottie'/>
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
              <h4>Jockey Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

                <Link to="/jockeyform">
                  <button>Add Jockey</button>
                </Link>
                <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Filter</Tooltip>}
                      >
                        <span
                          className="addmore"
                        >
                          <BiFilter
                    className="calendericon"
                    onClick={() => setShowCalender(!ShowCalender)}
                  />
                        </span>
                  </OverlayTrigger>
                <CSVLink  data={jockey}  separator={";"} filename={"MKS Jockey.csv"} className='csvclass'>
                        Export CSV
                </CSVLink>
              </div>
            </div>
            <div>
              
              {
                ShowCalender ?
                <>
                <div className="userfilter">
                  <div className="calenderuser">
                    <DateRangePicker
                      onChange={(item) => setState([item.selection])}
                      showSelectionPreview={true}
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={state}
                      direction="horizontal"
                    />
                  </div>
                  <div className="filtertextform">
                  <input
                      type="text"
                      class="form-control"
                      onChange={(e) => setSearchNameEn(e.target.value)}
                      placeholder="Enter Name"
                    />
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => setSearchRating(e.target.value)}
                      placeholder="Enter Rating"
                    />
               
                   
                   
                  </div>
                </div>
                <button className="filterbtn" onClick={GetSearch}>
                  Apply Filter
                </button>
              </>:<></>
              }
              </div>
            <>
              <div className="div_maintb">
                <ScrollContainer>
                  <table>
                    <thead>
                      <tr>
                      <th>Action</th>
                        <th>Jockey Name</th>
                        <th>Name Arabic </th>
                        <th>Short Name </th>
                        <th>Short Name Arabic</th>
                        <th>Age</th>
                        <th>Rating</th>
                        <th>License Date </th>
                        <th>Remarks</th>
                        <th>Remarks Arabic </th>
                        <th>Min Weight</th>
                        <th>Max Weight</th>
                        <th>Nationality</th>
                        <th>Active</th>

                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((item, index) => {
                        return (
                          <>
                            <tr className="tr_table_class">
                            <td className="table_delete_btn1">
                                  <BiEdit onClick={() => navigate('/editjockey',{
                                state:{
                                  jockeyid:item
                                }
                              })}/>
                                  <MdDelete
                                  onClick={() => handleRemove(item._id)}
                                />
                                <BsEyeFill onClick={() => handleShow(item)}/>
                              </td>
                              <td>{item.NameEn}</td>
                              <td>{item.NameAr}</td>
                              <td>{item.ShortNameEn}</td>
                              <td>{item.ShortNameAr === '' ? <>N/A</> : item.ShortNameAr}</td>
                              <td>
                                {" "}
                                <Moment fromNow ago>
                                  {item.DOB}
                                </Moment>
                              </td>
                              <td>{item.Rating} </td>

                              <td>
                                <Moment format="YYYY/MM/DD">
                                  {item.JockeyLicenseDate}
                                </Moment>{" "}
                              </td>
                              <td>{item.RemarksEn}</td>
                              <td>{item.RemarksAr} </td>
                              <td>{item.MiniumumJockeyWeight} KG</td>
                              <td>{item.MaximumJockeyWeight} KG</td>
                              <td>{item.JockeyNationalityData === null ? <>N/A</> : item.JockeyNationalityData.NameEn}</td>
                              <td>
                                <Form.Check 
                                  type="switch"
                                  id="custom-switch"
                                  onChange={() => setValue(true)}
                                  // label="Check this switch"
                                  value={Value}
                                />
                                </td>
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
            </>
          </div>
          <span className="plusIconStyle"></span>
          <Pagination
          postsPerPage={postsPerPage}
          totalPosts={jockey.length}
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
          <h2>Jockey </h2>
        </Modal.Header>
        <Modal.Body>
          <JockeyPopup data={modaldata} />
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
export default Statistic;
