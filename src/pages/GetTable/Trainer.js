import React, { useEffect, useState } from "react";
import { fetchTrainer, STATUSES } from "../../redux/getReducer/getTrainerSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { remove } from "../../redux/postReducer/PostTrainer";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import TrainerPopup from "../../Components/Popup/TrainerPopup";
import { BsFillEyeFill } from "react-icons/bs";
import ScrollContainer from "react-indiana-drag-scroll";
import Moment from "react-moment";
import swal from "sweetalert";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import Pagination from "./Pagination";
import { BiFilter } from "react-icons/bi";
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { DateRangePicker } from 'react-date-range';
import Form from "react-bootstrap/Form";
import TrainerCSV from '../../Components/CSVUploadPopup/TrainerPopup'

const Trainer = () => {
  const [ShowCalender, setShowCalender] = useState(false);
  const [SearchData, setSearchData] = useState([]);
  const [SearchNameEn, setSearchNameEn] = useState('');
  const [SearchRating, setSearchRating] = useState('');
  const [SearchRemarks, setSearchRemarks] = useState('');
  
  const [Value, setValue] = useState(false);

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

   const [showCSV, setShowCSV] = useState(false);
  const [modaldataCSV, setmodaldataCSV] = useState();
  const handleCloseCSV = () => setShowCSV(false);
  const handleShowCSV = async (data) => {
    setmodaldataCSV(data)
    await setShowCSV(true);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: trainer, status } = useSelector((state) => state.trainer);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = trainer.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const GetSearch = async () => {
    // const response = await axios.get(
    //   `${window.env.API_URL}/SearchTrainer?NameEn=${SearchNameEn}&DOB=${SearchAge}&RemarksEn=${SearchRemarks}&ShortNameEn=${SearchRating}`
    // );
    // setSearchData(response.data.data);
    dispatch(fetchTrainer({SearchRemarks,SearchNameEn,SearchRating}));
    setSearchRemarks('')
    setSearchRating('')

    setSearchNameEn('')
  

  };
  useEffect(() => {
    dispatch(fetchTrainer({SearchRating,SearchRemarks,SearchNameEn}));
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
            `${window.env.API_URL}/softdeletetrainer/${Id}`
          );
          swal("Your data has been deleted Successfully!", {
            icon: "success",
          });
          dispatch(fetchTrainer());
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
  const dob = new Date().toLocaleString();
  const age = " 2022-11-14T00:00:00.000Z";

  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            {" "}
            <div className="Header ">
              <h4>Trainer Listings</h4>

              <div>
             

                <Link to="/trainerform">
                  <button>Add Trainer</button>
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
                <p onClick={() => handleShowCSV()} className="importcsv">Import JSON</p>

                {/* <CSVLink
                  data={trainer}
                  separator={";"}
                  filename={"MKS Trainer.csv"}
                  className="csvclass"
                >
                  Export CSV
                </CSVLink> */}
              </div>
            </div>
            <div>
              {ShowCalender ? (
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
                    placeholder="Enter Title"
                  />
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setSearchRemarks(e.target.value)}
                    placeholder="Enter Remarks"
                  />
              
               
            
                 
                 
                </div>
              </div>
              <button className="filterbtn" onClick={GetSearch}>
                Apply Filter
              </button>
            </>
              ) : (
                <></>
              )}
            </div>
            <>
              <div className="div_maintb">
                <ScrollContainer className="scroll-container">
                  <table>
                    <thead>
                      <tr >
                        
                      <th>Action</th>
                        <th>Name</th>
                        <th>Name Arabic</th>
                        <th>Age</th>
                        <th>Title</th>
                        <th>Title Arabic</th>
                        {/* <th>Date Of Birth</th> */}
                        <th>License Date</th>
                        <th>Short Name</th>
                        <th>Short Name Arabic </th>
                        {/* <th>Rating</th> */}

                        <th>Remarks</th>
                        <th>Remarks Arabic</th>
                        <th>Details</th>
                        <th>Details Arabic</th>
                     
                        <th>Nationality</th>

                        <th>Image</th>

                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((item, index) => {
                        return (
                          <>
                            <tr key={index}
                             className="tr_table_class">
                            <td
                                className="table_delete_btn1"
                                // style={{ textAlign: "center" }}
                              >
                                 <BiEdit
                                  onClick={() =>
                                    navigate("/edittrainer", {
                                      state: {
                                        trainerid:item,
                                      },
                                    })
                                  }
                                />
                                <MdDelete
                                  onClick={() => handleRemove(item._id)}
                                />
                                <BsEyeFill onClick={() => handleShow(item)} />
                              </td>
                              <td>{item.NameEn}</td>
                              <td>{item.NameAr}</td>
                              <td>
                                {" "}
                                <Moment fromNow ago>
                                  {item.DOB}
                                </Moment>
                              </td>
                              <td>{item.TitleEn}</td>
                              <td>
                                {item.TitleAr === "" ? <>N/A</> : item.TitleAr}
                              </td>

                              {/* <td>{item.DOB} </td> */}
                              
                              
                              <td>
                                {" "}
                                <Moment format="YYYY/MM/DD">
                                  {item.TrainerLicenseDate}
                                </Moment>
                              </td>
                              <td>{item.ShortNameEn}</td>
                              <td>
                                {item.ShortNameAr === "" ? (
                                  <>N/A</>
                                ) : (
                                  item.ShortNameAr
                                )}{" "}
                              </td>

                              {/* <td>{item.Rating}</td> */}
                              <td
                                style={{
                                  maxWidth: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.RemarksEn === null ?<>N/A</> : <>{item.RemarksEn}</>}
                              </td>
                              <td
                                style={{
                                  maxWidth: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.RemarksAr === null ?<>N/A</> : <>{item.RemarksAr}</>}
                              </td>
                              <td
                                style={{
                                  maxWidth: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.DetailEn}
                              </td>
                              <td
                                style={{
                                  maxWidth: "400px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.DetailAr}
                              </td>
                              <td>
                                {item.TrainerNationalityData === null ? (
                                  <>N/A</>
                                ) : (
                                  item.TrainerNationalityData.NameEn
                                )}
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
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={trainer.length}
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
          <h2 style={{ fontFamily: "inter" }}>Trainer </h2>
        </Modal.Header>
        <Modal.Body>
          <TrainerPopup data={modaldata} />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="modalClosebtn">
            Close
          </button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={showCSV}
        onHide={handleCloseCSV}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2 style={{ fontFamily: "inter" }}>Trainer JSON</h2>
        </Modal.Header>
        <Modal.Body>
          <TrainerCSV data={modaldataCSV} />
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Trainer;
