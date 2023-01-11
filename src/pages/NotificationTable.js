import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import swal from "sweetalert";
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../assets/horselottie.json";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
// import BreederPopup from "../../Components/Popup/BreederPopup";
// import Pagination from "./Pagination";
import { BiFilter } from "react-icons/bi";
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { DateRangePicker } from 'react-date-range';
import Form from "react-bootstrap/Form";
import Email from "../Components/Template/Email";
// import CSVBreeder from '../../Components/CSVUploadPopup/BreederPopup'
const NotificationTable = () => {
    const dispatch = useDispatch();
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
    const GetSearch = async () => {
        // dispatch(fetchbreeder({ SearchTitle, SearchCode, SearchAge, }));
        setSearchTitle('')
        setSearchCode('')
        setSearchAge('')



    };

    const [show, setShow] = useState(false);
    const [modaldata, setmodaldata] = useState();
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setmodaldata();

        await setShow(true);

    };
    // Data for templates
    const resetPassword = "Reset Password"
    const signUp = "Signup Successfull  "












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
                            <h4>All Emails</h4>

                            <div>

                                {/* <Link to="/breeder">
                                    <button>Add Breeder</button>
                                </Link> */}
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
                                {/* <p onClick={() => handleShowCSV()} className="importcsv">Import JSON</p> */}
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

                                <table>
                                    <thead>
                                        <tr>
                                            <th>Action</th>
                                            <th>Subject</th>
                                            <th>Active </th>

                                        </tr>
                                    </thead>
                                    <tbody>


                                        <tr className="tr_table_class">
                                            <td className="table_delete_btn1">
                                                <BiEdit style={{
                                                    fontSize: "22px",
                                                    color: "black"
                                                }} onClick={() => handleShow()}


                                                />
                                                <MdDelete
                                                    style={{
                                                        fontSize: "22px",
                                                        color: "black"
                                                    }}
                                                />
                                                <BsEyeFill
                                                    style={{
                                                        fontSize: "22px",
                                                        color: "black"
                                                    }} />
                                            </td>
                                            <td>
                                                {resetPassword}

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

                                        <tr className="tr_table_class">
                                            <td className="table_delete_btn1">
                                                <BiEdit style={{
                                                    fontSize: "22px",
                                                    color: "black"
                                                }} onClick={() => handleShow()}


                                                />
                                                <MdDelete
                                                    style={{
                                                        fontSize: "22px",
                                                        color: "black"
                                                    }}
                                                />
                                                <BsEyeFill
                                                    style={{
                                                        fontSize: "22px",
                                                        color: "black"
                                                    }} />
                                            </td>
                                            <td>
                                                {signUp}

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
                                    </tbody>
                                    {/* <tbody>
                                            {currentPosts.map((item, index) => {
                                                return (
                                                    <>
                                                      
                                                            <td>{item.NameEn}</td>
                                                            <td>{item.NameAr}</td>

                                                            <td>{item.shortCode} </td>
                                                            <td>{item.DescriptionEn} </td>
                                                            <td>{item.DescriptionAr} </td>
                                                            <td>
                                                                <img src={item.image} alt="" />
                                                            </td>
                                                           
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                        </tbody> */}
                                </table>

                            </div>
                        </>
                    </div>
                    <span className="plusIconStyle"></span>
                    {/* <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={breeder.length}
                        currentPage={currentPage}
                        paginate={paginate}
                    /> */}
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h2 style={{ fontFamily: "inter" }}>{resetPassword}</h2>
                </Modal.Header>
                <Modal.Body>
                    <Email data={resetPassword} />
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h2 style={{ fontFamily: "inter" }}>{signUp}</h2>
                </Modal.Header>
                <Modal.Body>
                    <Email data={signUp} />
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>


            {/* <Modal
        show={showCSV}
        onHide={handleCloseCSV}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2 style={{ fontFamily: "inter" }}>Breeder JSON</h2>
        </Modal.Header>
        <Modal.Body>
          <CSVBreeder data={modaldataCSV} />
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal> */}
        </Fragment>
    )
}

export default NotificationTable