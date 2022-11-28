import React, { useEffect, useState } from "react";
import { fetchjockey, STATUSES } from "../../redux/getReducer/getJockeySlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { remove } from "../../redux/postReducer/PostJockey";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import swal from "sweetalert";
import JockeyPopup from "../../Components/Popup/JockeyPopup";
import { Modal } from "react-bootstrap";
import { BsFillEyeFill } from "react-icons/bs";
import ScrollContainer from "react-indiana-drag-scroll";
import Moment from "react-moment";
import axios from "axios";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";


const Statistic = () => {
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
  useEffect(() => {
    dispatch(fetchjockey());
    
  }, [dispatch]);
  const handleRemove = (Id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        dispatch(remove(Id));
        navigate("/jockey");
      } else {
        swal("Your imaginary file is safe!");
      }
    });
    
  };

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
              </div>
            </div>
            <>
              <div className="div_maintb">
                <ScrollContainer>
                  <table>
                    <thead>
                      <tr>
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
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jockey.map((item, index) => {
                        return (
                          <>
                            <tr className="tr_table_class">
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
                              <td>{item.JockeyNationalityData.NameEn}</td>
                              <td>
                                <img src={item.image} alt="" />
                              </td>

                              <td className="table_delete_btn1" onClick={() => navigate('/editjockey',{
                                state:{
                                  jockeyid:item._id
                                }
                              })}>
                                  <BiEdit />
                                <MdDelete
                                  // onClick={() => handleRemove(item._id)}
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
