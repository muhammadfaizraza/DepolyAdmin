import React, { useEffect ,Fragment,useState } from "react";
import { fetchTrackLength,STATUSES } from "../../redux/getReducer/getTracklength";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link ,useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import ScrollContainer from "react-indiana-drag-scroll";
import { alignPropType } from "react-bootstrap/esm/types";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import TrackLengthPopup from "../../Components/Popup/TrackLengthPopup";
import { Modal } from "react-bootstrap";

const Tracklength = () => {
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };

    
const dispatch =useDispatch() ;
const navigate = useNavigate();
const { data: trackLength, status } = useSelector((state) => state.trackLength);
useEffect(() => {
  dispatch(fetchTrackLength());
}, [dispatch]);
const handleRemove = async (Id) => {
  try {
    const res = await axios.delete(`${window.env.API_URL}/softdeleteTrackLength/${Id}`)
    swal({
      title: "Success!",
      text: "Data has been Deleted successfully ",
      icon: "success",
      button: "OK",
    });
    dispatch(fetchTrackLength());
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
                  <h4>Track Length Listings</h4>
    
                  <div>
                    <h6
                      style={{
                        marginRight: "100px",
                        alignItems: "center",
                        color: "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      
                    </h6>
    
                    <Link to="/tracklengthform">
                      <button>Add Track Length</button>
                    </Link>
                  </div>
                </div>
                <>
                  <div className="div_maintb">
                    <ScrollContainer >
                    <table>
                      <thead>
                        <tr>
                          <th>Track Length</th>
                          <th>Race Course </th>
                          <th>RaceCourse Image</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trackLength.map((item, index) => {
                          return (
                            <>
                              <tr className="tr_table_class">
                                <td>{item.TrackLength}</td>
                                <td>{item.RaceCourseData.TrackNameEn}</td>
                                <td><img src={item.RaceCourseImage}/></td>
                                <td className="table_delete_btn1">
                                <BiEdit
                                  onClick={() =>
                                    navigate("/edittrack", {
                                      state: {
                                        trackid: item,
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
          <h2 style={{fontFamily:"inter"}}>TrackLength </h2>
        </Modal.Header>
        <Modal.Body>
          <TrackLengthPopup data={modaldata} />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="modalClosebtn">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    
     </Fragment>
  )
}

export default Tracklength