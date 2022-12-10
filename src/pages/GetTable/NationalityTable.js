import React, { useEffect, Fragment ,useState} from "react";
import {
  fetchnationality,
  STATUSES,
} from "../../redux/getReducer/getNationality";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { remove } from "../../redux/postReducer/PostJockey";
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

const NationalityTable = () => {
//for Modal 
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
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

  useEffect(() => {
    dispatch(fetchnationality());
  }, [dispatch]);
  const handleRemove = async (Id) => {
    try {
      const res = await axios.delete(`${window.env.API_URL}/softdeleteNationality/${Id}`)
      swal({
        title: "Success!",
        text: "Data has been Deleted successfully ",
        icon: "success",
        button: "OK",
      });
      dispatch(fetchnationality());
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
              <h4>Nationality Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                ></h6>

                <Link to="/nationality">
                  <button>Add Nationality</button>
                </Link>
              </div>
            </div>
            <>
              <div className="div_maintb">
                <ScrollContainer>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Name Arabic </th>
                        <th>Alternative Name </th>

                        <th>Abbreviation</th>
                        <th>Short Code</th>
                        <th>Label</th>
                        <th>Off Set </th>

                        <th>Value</th>

                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((item, index) => {
                        return (
                          <>
                            <tr className="tr_table_class">
                              <td>{item.NameEn}</td>
                              <td>{item.NameAr}</td>
                              <td>{item.AltName}</td>
                              <td>{item.Abbrev}</td>
                              <td>{item.shortCode} </td>
                              <td>{item.Label} </td>
                              <td>{item.Offset === 'true' ? <>True</> : <>Talse</>} </td>
                              <td>{item.Value}</td>

                              <td>
                                <img src={item.image} alt="" />
                              </td>

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
          <h2 style={{fontFamily: "inter"}}>Nationality</h2>
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
    </Fragment>
  );
};

export default NationalityTable;
