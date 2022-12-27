import React, { useEffect, Fragment,useState } from "react";
import { fetchpointTable, STATUSES } from "../../redux/getReducer/getPointTable";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import ColorPopup from "../../Components/Popup/ColorPopup";
import {BsEyeFill} from "react-icons/bs"
import Pagination from "./Pagination";
import { BiFilter } from 'react-icons/bi';
import { CSVLink } from "react-csv";


const ColorTable = () => {
  const [ShowCalender, setShowCalender] = useState(false)

  const [modaldata, setmodaldata] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };




  const dispatch = useDispatch();
  const history = useNavigate();
  const { data: pointTable, status } = useSelector((state) => state.pointTable);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pointTable.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(fetchpointTable());
  }, [dispatch]);
  const handleRemove = async (Id) => {
    try {
    await axios.delete(`${window.env.API_URL}/softdeletePointTableSystem/${Id}`);
      swal({
        title: "Success!",
        text: "Data has been Deleted successfully ",
        icon: "success",
        button: "OK",
      });
      history("/viewcompetitionPoint");
      dispatch(fetchpointTable());
    } catch (error) {
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }
    history("/viewcompetitionPoint");
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
              <h4>Point Table Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

                <Link to="/addcompetitionPoint">
                  <button>Add Point Table</button>
                </Link>
                <BiFilter className="calendericon" onClick={() => setShowCalender(!ShowCalender)}/>
                <CSVLink  data={pointTable}  separator={";"} filename={"MKS Point Table.csv"} className='csvclass'>
                        Export CSV
                </CSVLink>
              </div>
            </div>
            <>
              <div className="div_maintb">
                <ScrollContainer>
                  <table>
                    <thead>
                      <tr>
                        <th>Group Name</th>
                        <th>Rank </th>
                        <th>Point</th>
                        <th> Bonus Point:</th>
                        {/* <th>First Place Bonus Point</th>
                        <th>Second Place Bonus Point </th>
                        <th>Third Place Bonus Point </th>
                        <th>Fourth Price</th>
                        <th>Fifth Price</th>
                        <th>Sixth Price</th> */}
                        <th>Short Code</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((item, index) => {
                        return (
                          <>
                            <tr className="tr_table_class">
                              <td>{item.Group_Name}</td>
                              <td>{item.Rank}</td>
                              <td>{item.Point}</td>
                              <td>{item.Bonus_Point}</td>
                              {/* <td>{item.First_Place_Bonus_Point}</td>
                              <td>{item.Second_Place_Bonus_Point}</td>
                              <td>{item.Third_Place_Bonus_Point}</td>
                              <td>{item.FourthPrice}</td>
                              <td>{item.FifthPrice}</td>
                              <td>{item.SixthPrice}</td> */}
                              <td>{item.shortCode} </td>

                              <td className="table_delete_btn1">
                                <BiEdit
                                  // onClick={() =>
                                  //   history("/editcolor", {
                                  //     state: {
                                  //       colorid: item,
                                  //     },
                                  //   })
                                  // }
                                />
                                <MdDelete
                                  style={{
                                    fontSize: "22px",
                                  }}
                                  onClick={() => handleRemove(item._id)}
                                />
                                <BsEyeFill
                                //  onClick={() => handleShow(item)}
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
          totalPosts={pointTable.length}
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
          <h2>Color  </h2>
        </Modal.Header>
        <Modal.Body>
          <ColorPopup data={modaldata} />
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

export default ColorTable;
