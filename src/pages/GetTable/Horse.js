import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchHorse, STATUSES } from "../../redux/getReducer/getHorseSlice";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import ScrollContainer from "react-indiana-drag-scroll";
import swal from "sweetalert";
import Moment from "react-moment";
import { Modal } from "react-bootstrap";
import HorsePopup from "../../Components/Popup/HorsePopup";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import {BsEyeFill} from "react-icons/bs"
import Pagination from "./Pagination";
import { BiFilter } from 'react-icons/bi';
import { CSVLink } from "react-csv";


const Horse = () => {
//for errors

const [ShowCalender, setShowCalender] = useState(false)

  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };
  const dispatch = useDispatch();
  const history = useNavigate();
  const { data: horse, status } = useSelector((state) => state.horse);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = horse.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  useEffect(() => {
    dispatch(fetchHorse());
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
          await axios.delete(`${window.env.API_URL}/softdeletehorse/${Id}`)
          swal("Your data has been deleted Successfully!", {
            icon: "success",
         
          }
          )
          dispatch(fetchHorse())
          
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
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Header ">
              <h4>Horse Listings</h4>

              <div>
       

                <Link to="/horseform">
                  <button>Add Horse</button>
                </Link>
                <BiFilter className="calendericon" onClick={() => setShowCalender(!ShowCalender)}/>

                <CSVLink  data={horse}  separator={";"} filename={"MKS Horses.csv"} className='csvclass'>
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
                
                 <input type='text' class="form-control" placeholder="Enter Title"/>
                 <input type='text' class="form-control" placeholder="Enter Description"/>
                 </div>
                
                </div>
                <button className="filterbtn">Apply Filter</button>
                </span>:<></>
              }
              </div>
            <>
              <div className="div_maintb">
                <ScrollContainer className="scroll-container">
                  <table id="customers">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Name Arabic</th>
                        <th>Age</th>
                        <th>Sex</th>
                        <th>Color</th>
                        <th>Purchase Price</th>
                        <th>Breeder</th>
                        {/* <th>Active Owner</th>
                        <th>Over All Rating</th> */}
                        {/* <th>Dam</th>
                        <th>Sire</th>
                        <th>GSire</th> */}
                        <th>Remarks</th>

                        <th>Rds</th>
                        {/* <th>Cap</th> */}

                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    {currentPosts.map((item) => {
                      return (
                        <>
                          <tbody>
                            <tr>
                              <td>{item.NameEn}</td>
                              <td>{item.NameAr}</td>
                              <td>
                           
                                <Moment fromNow ago>
                                  {item.DOB}
                                </Moment>
                              </td>

                              <td>{item.SexModelData === null ? <>N/A</>: <>{item.SexModelData.NameEn}</>}</td>

                              <td>{item.ColorIDData === null ? <>N/A</> : item.ColorIDData.NameEn} </td>
                              {/* <td>{item.KindOfHorse === '' ? <>N/A</>: item.KindOfHorse}</td> */}
                              <td>{item.PurchasePrice}</td>
                              <td>
                                {item.BreederData === null ? (
                                  <>No Data</>
                                ) : (
                                  <>{item.BreederData.NameEn}</>
                                )}
                              </td>
                              <td className='cell'>{item.RemarksEn}</td>
                              {/* <td>
                                {item.OwnerModels === undefined ? (
                                  <>No Data</>
                                ) : (
                                  <>{item.OwnerModels.map((data) => data.NameEn)}</>
                                )}
                              </td> */}
                              <td>{item.Rds === true ? <>Yes</> : <>No</>}</td>

                              {/* <td>{item.DamData.NameEn === undefined ? <>N/A</>: <> {item.DamData.NameEn}</>}</td> */}
                              {/* <td>{item.SireData.NameEn}</td>
                              <td>{item.GSireData.NameEn}</td> */}
                              {/* <td>{item.Remarks}</td> */}
                              {/* <td>{item.PurchasePrice}</td> */}
                              {/* <td>{item.Rds}</td> */}
                              {/* <td>{item.Cap}</td> */}
                              <td>
                                <img
                                  src={item.HorseImage}
                                  alt=""
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                  }}
                                ></img>
                              </td>
                              <td
                                className="table_delete_btn1"
                                style={{ textAlign: "center" }}
                              >
                                <BiEdit
                                  onClick={() =>
                                    history("/edithorse", {
                                      state: {
                                        horseid: item,
                                      },
                                    })
                                  }
                                />
                                <MdDelete
                                  onClick={() => handleRemove(item._id)}
                                />
                                <BsEyeFill onClick={() => handleShow(item)}/>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </ScrollContainer>
              </div>
            </>
          </div>
          <Pagination
          postsPerPage={postsPerPage}
          totalPosts={horse.length}
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
          <h2>Horse </h2>
        </Modal.Header>
        <Modal.Body>
          <HorsePopup data={modaldata} />
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
export default Horse;
