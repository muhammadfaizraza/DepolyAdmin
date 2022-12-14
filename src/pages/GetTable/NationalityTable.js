import React, { useEffect, Fragment, useState } from "react";
import {
  fetchnationality,
  STATUSES,
} from "../../redux/getReducer/getNationality";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import swal from "sweetalert";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import ScrollContainer from "react-indiana-drag-scroll";
import axios from "axios";
import { Modal } from "react-bootstrap";
import NationalityPopup from "../../Components/Popup/NationalityPopup";
import { BsEyeFill } from "react-icons/bs";
import Pagination from "./Pagination";
import { BiFilter } from 'react-icons/bi';
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { DateRangePicker } from 'react-date-range';
import Form from "react-bootstrap/Form";
import CSVNationalityPopup from '../../Components/CSVUploadPopup/NationalityPopup'

const NationalityTable = () => {
  //for Modal
  const [Value, setValue] = useState(false);

  const [ShowCalender, setShowCalender] = useState(false)
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


  const [showCSV, setShowCSV] = useState(false);
  const [modaldataCSV, setmodaldataCSV] = useState();
  const handleCloseCSV = () => setShowCSV(false);
  const handleShowCSV = async (data) => {
    setmodaldataCSV(data);
    await setShowCSV(true);
  };


  const dispatch = useDispatch();
  const history = useNavigate();
  const { data: nationality, status } = useSelector(
    (state) => state.nationality
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = nationality.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const GetSearch = async () => {
    dispatch(fetchnationality({ SearchTitle, SearchCode, SearchAge }));
    setSearchTitle('')
    setSearchCode('')
    setSearchAge('')
  };

  useEffect(() => {
    dispatch(fetchnationality({ SearchTitle, SearchCode, SearchAge }));
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

        .then(async (willDelete) => {



          if (willDelete) {

            await axios.delete(`${window.env.API_URL}/softdeleteNationality/${Id}`)
            swal("Your data has been deleted Successfully!", {
              icon: "success",

            }
            )
            dispatch(fetchnationality({ SearchTitle, SearchCode, SearchAge }));

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



  }

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
                <p onClick={() => handleShowCSV()} className="importcsv">Import JSON</p>
                {/* <CSVLink data={nationality} separator={";"} filename={"MKS Nationality.csv"} className='csvclass'>
                  Export CSV
                </CSVLink> */}
              </div>
            </div>
            <div>

              {
                ShowCalender ?
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
                          placeholder="Enter Abbreviation"
                        />
                        <input
                          type="text"
                          class="form-control"
                          onChange={(e) => setSearchAge(e.target.value)}
                          placeholder="Enter Alternative Name"
                        />
                      </div>

                    </div>
                    <button className="filterbtn" onClick={GetSearch}>
                      Apply Filter
                    </button>
                  </span> : <></>
              }
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
                        <th>Alternative Name </th>
                        <th>Alternative Name Arabic</th>
                        <th>Abreviation </th>
                        <th>Abreviation Arabic</th>
                        <th>Hemisphere English</th>
                        <th>Hemisphere Arabic</th>

                        <th>Short Code</th>
                        {/* <th>Label</th> */}
                        {/* <th>Off Set </th>

                        <th>Value</th> */}
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
                                <BiEdit
                                  onClick={() =>
                                    history("/editnationality", {
                                      state: {
                                        nationalityid: item,
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
                              <td>{item.AltNameEn}</td>
                              <td>{item.AltNameAr}</td>
                              <td>{item.AbbrevEn}</td>
                              <td>{item.AbbrevAr}</td>
                              <td>{item.HemisphereEn}</td>
                              <td>{item.HemisphereAr === undefined ? <>?????? ?????????? ??????????????</> : item.HemisphereAr}</td>
                              <td>{item.shortCode} </td>
                              {/* <td>{item.Label} </td> */}
                              {/* <td>{item.Offset === 'true' ? <>True</> : <>False</>} </td> */}
                              {/* <td>{item.ValueEn}</td> */}
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
            totalPosts={nationality.length}
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
          <h2 style={{ fontFamily: "inter" }}>Nationality</h2>
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

      <Modal
        show={showCSV}
        onHide={handleCloseCSV}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2 style={{ fontFamily: "inter" }}>Nationality JSON</h2>
        </Modal.Header>
        <Modal.Body>
          <CSVNationalityPopup data={modaldataCSV} />
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default NationalityTable;
