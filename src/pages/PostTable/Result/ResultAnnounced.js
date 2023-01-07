  import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../../redux/postReducer/postRace";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../../Components/CSS/Table.css";
import ScrollContainer from "react-indiana-drag-scroll";
import "../../../Components/CSS/race.css";
import { Modal } from "react-bootstrap";
import RacePopup from "../../../Components/Popup/RacePopup";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import Moment from "react-moment";
import { fetchraceresult ,STATUSES } from "../../../redux/getReducer/getRaceResultAnnounced";
import Lottie from "lottie-react";
import HorseAnimation from "../../../assets/horselottie.json";
import { BiEdit } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
const Races = () => {

  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  
  const dispatch = useDispatch();
  const history = useNavigate()
  const { data: raceresult, status } = useSelector((state) => state.raceresult);
  const handleRemove = async (Id) => {
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
      } else {
        swal("Your Data is safe!");
      }
    });
  };
  useEffect(() => {
    dispatch(fetchraceresult());
  }, []);
  
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

  console.log(raceresult,'data is this')
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
              <h4>Result Announced</h4>
              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

               
              </div>
            </div>

            <div class="div_maintb">
              <ScrollContainer className="scroll-container">
                <table className="Sc">
                  <thead
                    style={{
                      marginTop: "30px",
                    }}
                  >
                    <tr className="trtabletd">
                    <th>Action</th>
                      <th>BonusPoints</th>
                      <th>Final Position</th>
                      <th>Horse</th>
                      <th>Points</th>
                      <th>Prize</th>
                      <th>Rank</th>
                      <th>VideoLink</th>
                     
                    </tr>
                  </thead>
                  {raceresult.RaceResultData === undefined ? (
                    <h3
                      style={{
                        textAlign: "center",
                      }}
                    >
                      No Data
                    </h3>
                  ) : (
                    <>
                      {raceresult.RaceResultData.map((item) => {
                        return (
                          <tbody
                            key={item._id}
                            style={{
                              marginTop: "20px",
                            }}
                          >
                            <tr>
                            <td className="table_delete_btn1">
                                <BiEdit
                                  onClick={() =>
                                    history("/editads", {
                                      state: {
                                        adsid: item,
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
                                <BsEyeFill/>
                              </td>
                              <td>{item.BonusPoints === null ? <>N/A</> : item.BonusPoints} </td>
                            
                              <td>{item.FinalPosition === null ? <>N/A</> : item.FinalPosition} </td>
                              <td>{item.HorseID === null ? <>N/A</> : item.HorseID} </td>
                              
                              <td>{item.Points === null ? <>N/A</> : item.Points} </td>
                              <td>{item.Prize === null ? <>N/A</> : item.Prize} </td>
                              
                              <td>{item.Rank === null ? <>N/A</> : item.Rank} </td>
                              <td>{item.VideoLink === null ? <>N/A</> : item.VideoLink} </td>
                              
                            </tr>
                          </tbody>
                        );
                      })}
                    </>
                  )}
                </table>
              </ScrollContainer>
            </div>
          </div>
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
          <h2>Race Course </h2>
        </Modal.Header>
        <Modal.Body>
          <RacePopup data={modaldata} />
        </Modal.Body>
       
       
      </Modal>
    </>
  );
};
export default Races;
