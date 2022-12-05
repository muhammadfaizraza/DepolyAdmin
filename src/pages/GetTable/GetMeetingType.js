import React, { useEffect, Fragment ,useState} from "react";
import { fetchMeeting, STATUSES } from "../../redux/getReducer/getMeeting";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { remove } from "../../redux/postReducer/PostJockey";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import MeetingPopup from "../../Components/Popup/MeetingPopup";

const GetMeetingType = () => {

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
  const { data: meeting, status } = useSelector((state) => state.meeting);
  useEffect(() => {
    dispatch(fetchMeeting());
  }, [dispatch]);
  
  const handleRemove = async (Id) => {
    try {
      const res = await axios.delete(`${window.env.API_URL}/softdeleteMeetingType/${Id}`)
      swal({
        title: "Success!",
        text: "Data has been Deleted successfully ",
        icon: "success",
        button: "OK",
      });
      dispatch(fetchMeeting());
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
    <Fragment>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Header ">
              <h4>Meeting Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    meeting: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

                <Link to="/meeting">
                  <button>Add meeting</button>
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

                        <th>Short Code</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meeting.map((item, index) => {
                        return (
                          <>
                            <tr className="tr_table_class">
                              <td>{item.NameEn}</td>
                              <td>{item.NameAr}</td>

                              <td>{item.shortCode} </td>

                              <td className="table_delete_btn1">
                                <BiEdit
                                  onClick={() =>
                                    history("/editmeetingtype", {
                                      state: {
                                        meetingtypeid: item,
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
                                <BsEyeFill onClick={() => handleShow(item)}/>
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
          <h2 style={{fontFamily: "inter"}}>Meeting Type</h2>
        </Modal.Header>
        <Modal.Body>
          <MeetingPopup data={modaldata} />
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

export default GetMeetingType;
