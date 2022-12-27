import React, { useEffect, useState } from "react";
import { fetchcompetition, STATUSES } from "../../redux/getReducer/getCompetition";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import swal from "sweetalert";
import JockeyPopup from "../../Components/Popup/JockeyPopup";
import { Modal } from "react-bootstrap";
import { BsEyeFill, BsFillEyeFill } from "react-icons/bs";
import ScrollContainer from "react-indiana-drag-scroll";
import Moment from "react-moment";
import axios from "axios";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import CompetitionPopup from "../../Components/Popup/CompetitionPopup";
import Pagination from "./Pagination";


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
  const history = useNavigate();

  const { data: competition, status } = useSelector((state) => state.competition);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = competition.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(fetchcompetition()); 
  }, [dispatch]);
  

  const GoToPublish = (competitionId) => {
    history("/competitionrace", {
      state: {
        CompetitionId: competitionId,
      },
    });
  }


  const handleRemove = async (Id) => {
    try {
      const res = await axios.delete(`${window.env.API_URL}/softdeleteCompetiton/${Id}`)
      swal({
        title: "Success!",
        text: "Data has been Deleted successfully ",
        icon: "success",
        button: "OK",
      });
      history("/competitionlisting");
      dispatch(fetchcompetition());
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
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Header ">
              <h4>Competition Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

                <Link to="/addcompetition">
                  <button>Add Competition</button>
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
                        <th>Competition Code </th>
                        <th>Short Code</th>
                        <th>Type/Category</th>
                        <th>End Date </th>
                        <th>Start Date </th>
                        <th>Start Date </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((item, index) => {
                        return (
                          <>
                            <tr className="tr_table_class">
                              <td>{item.NameEn === null ? <>N/A</>: item.NameEn}</td>
                              <td>{item.NameAr === null ? <>N/A</>:item.NameAr}</td>
                              <td>{item.CompetitionCode === null ? <>N/A</> : item.CompetitionCode}</td>
                              <td>{item.shortCode}</td>
                              <td>{item.CompetitionCategory}</td>
                              <td>{item.CategoryCount}</td>
                              <td>
                                <Moment format="YYYY/MM/DD">
                                  {item.StartDate}
                                </Moment>{" "}
                              </td>
                              <td>
                                <Moment format="YYYY/MM/DD">
                                  {item.EndDate}
                                </Moment>{" "}
                              </td>
                            

                              <td className="table_delete_btn1">
                                  <BiEdit onClick={() => navigate('/editcompetition',{
                                state:{
                                  competitionid:item
                                }
                              })}/>
                                  <MdDelete
                                  onClick={() => handleRemove(item._id)}
                                />
                                <BsEyeFill onClick={() => handleShow(item) } /> 
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
          totalPosts={competition.length}
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
          <h2>Competition </h2>
        </Modal.Header>
        <Modal.Body>
          <CompetitionPopup data={modaldata} />
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
