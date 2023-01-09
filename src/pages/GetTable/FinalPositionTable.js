import React, { useEffect, Fragment,useState } from "react";
import { fetchfinalposition, STATUSES } from "../../redux/getReducer/getFinalPosition";
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
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Finalpositionpopup from "../../Components/Popup/Finalpositionpopup";

const FinalPositionTable = () => {
    const [ShowCalender, setShowCalender] = useState(false)
  const [SearchUrl, setSearchUrl] = useState('');
  const [SearchCode, setSearchCode] = useState('');
  const [SearchTitle, setSearchTitle] = useState('');
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [modaldata, setmodaldata] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };




  const dispatch = useDispatch();
  const history = useNavigate();
  const { data: finalposition, status } = useSelector((state) => state.finalposition);

 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = finalposition.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const GetSearch = async () => {
    dispatch(fetchfinalposition({SearchTitle,SearchCode,SearchUrl}));
    setSearchTitle('')
    setSearchCode('')
    setSearchUrl('')
  };

  useEffect(() => {
    dispatch(fetchfinalposition({SearchTitle,SearchCode,SearchUrl}));
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

      .then( async(willDelete) => {
     
  
   
        if (willDelete) {
          await axios.delete(`${window.env.API_URL}/softdeleteFinalPosition/${Id}`);
          swal("Your data has been deleted Successfully!", {
            icon: "success",
         
          }
          )
          dispatch(fetchfinalposition({SearchTitle,SearchCode,SearchUrl}))
          
        } else {
          swal("Your data is safe!");
        }
      });
   
    }catch(error) {

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
            <h4>Final Position</h4>

            <div>
           

              <Link to="/finalposition">
                <button>Add Final Position</button>
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
              <CSVLink  data={finalposition}  separator={";"} filename={"MKS Color.csv"} className='csvclass'>
                      Export CSV
              </CSVLink>
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
                        placeholder="Enter Title"
                        onChange={(e) => setSearchTitle(e.target.value)}

                      />
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Short Code"
                        onChange={(e) => setSearchCode(e.target.value)}

                      />
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Abbreviation"
                        onChange={(e) => setSearchUrl(e.target.value)}

                      />
                    </div>
                    
                  </div>
                  <button className="filterbtn" onClick={GetSearch}>
                 Apply Filter
               </button>
                </span>:<></>
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
                      <th>Rank </th>
                      <th>Short Code</th>

                      
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class"  >
                          <td className="table_delete_btn1">  
                              <BiEdit
                                onClick={() =>
                                  history("/editfinalposition", {
                                    state: {
                                     finalpositionid: item,
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
                            <td>{item.NameEn}</td>
                            <td>{item.NameAr}</td>
                            <td>{item.Rank}</td>
                            <td>{item.shortCode} </td>

                         
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
        totalPosts={finalposition.length}
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
        <h2>Final Posiiton</h2>
      </Modal.Header>
      <Modal.Body>
        <Finalpositionpopup data={modaldata} />
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

export default FinalPositionTable