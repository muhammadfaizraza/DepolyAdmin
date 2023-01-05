import React, { useEffect, Fragment, useState } from "react";
import { fetchbreeder, STATUSES } from "../../redux/getReducer/getBreeder";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import swal from "sweetalert";
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import BreederPopup from "../../Components/Popup/BreederPopup";
import Pagination from "./Pagination";
import { BiFilter } from "react-icons/bi";
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { DateRangePicker } from 'react-date-range';
import Form from "react-bootstrap/Form";
import CSVBreeder from '../../Components/CSVUploadPopup/BreederPopup'

const BreederTable = () => {
  const [ShowCalender, setShowCalender] = useState(false);
  const [SearchAge, setSearchAge] = useState('');
  const [SearchCode, setSearchCode] = useState('');
  const [SearchTitle, setSearchTitle] = useState('');
  const [Value, setValue] = useState(false);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [SearchStartDate, setSearchStartDate] = useState('');
  const [SearchEndStart, setSearchEndStart] = useState('');



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
    setmodaldataCSV(data);
    await setShowCSV(true);
  };
  
  const dispatch = useDispatch();
  const history = useNavigate();

  const { data: breeder, status } = useSelector((state) => state.breeder);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = breeder.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const GetSearch = async () => {
    setSearchEndStart(state[0].startDate.toISOString());
    setSearchStartDate(state[0].endDate.toISOString());
    dispatch(fetchbreeder({SearchTitle,SearchCode,SearchAge,SearchStartDate,SearchEndStart}));
    setSearchTitle('')
    setSearchCode('')
    setSearchAge('')
    setSearchEndStart('');
    setSearchStartDate('')

  };
  const UploadCSV = async () => {

  };

  useEffect(() => {
    dispatch(fetchbreeder({SearchTitle,SearchCode,SearchAge,SearchStartDate,SearchEndStart}));
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
          await axios.delete(`${window.env.API_URL}/softdeleteBreeder/${Id}`);
          swal("Your data has been deleted Successfully!", {
            icon: "success",
          });
          dispatch(fetchbreeder({SearchTitle,SearchCode,SearchAge,SearchStartDate,SearchEndStart}));
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
              <h4>Breeder Listings</h4>

              <div>
          
                <Link to="/breeder">
                  <button>Add Breeder</button>
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
                <p onClick={() => handleShowCSV()} className="importcsv">Import CSV</p>
                {/* <CSVLink
                  data={breeder}
                  separator={";"}
                  filename={"MKS Breeder.csv"}
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
               </>
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
                        <th>Description</th>
                        <th>Description Arabic</th>
                        <th>Image</th>
                        <th>Active</th>
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
                                    history("/editbreeder", {
                                      state: {
                                        breederid: item,
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
                              <td>{item.DescriptionEn} </td>
                              <td>{item.DescriptionAr} </td>
                              <td>
                                <img src={item.image} alt="" />
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
            </>
          </div>
          <span className="plusIconStyle"></span>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={breeder.length}
            currentPage={currentPage}
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
          <h2 style={{ fontFamily: "inter" }}>Breeder</h2>
        </Modal.Header>
        <Modal.Body>
          <BreederPopup data={modaldata} />
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
          <h2 style={{ fontFamily: "inter" }}>Breeder CSV</h2>
        </Modal.Header>
        <Modal.Body>
          <CSVBreeder data={modaldataCSV} />
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default BreederTable;
