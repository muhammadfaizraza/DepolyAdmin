import React, { useEffect, Fragment ,useState} from "react";
import {
  fetchnationality,
  STATUSES,
} from "../../redux/getReducer/getNationality";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
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
      swal({
        title: "Are you sure?",
        text: "do you want to delete this data ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })

      .then( async(willDelete) => {

  
   
        if (willDelete) {
          
        await axios.delete(`${window.env.API_URL}/softdeleteNationality/${Id}`)
          swal("Your data has been deleted Successfully!", {
            icon: "success",
         
          }
          )
          dispatch(fetchnationality())
          
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
              <h4>Nationality Listings</h4>

              <div>
             
             

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
                        <th>Hemisphere English</th>
                        <th>Hemisphere Arabic</th>
                        <th>Alternative Arabic</th>
                        <th>Short Code</th>
                        {/* <th>Label</th> */}
                        {/* <th>Off Set </th>

                        <th>Value</th> */}

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
                              <td>{item.AltNameEn}</td>
                              <td>{item.AltNameAr}</td>
                              <td>{item.HemisphereEn}</td>
                              <td>{item.HemisphereAr}</td>
                              <td>{item.shortCode} </td>
                              {/* <td>{item.Label} </td> */}
                              {/* <td>{item.Offset === 'true' ? <>True</> : <>False</>} </td> */}
                              {/* <td>{item.ValueEn}</td> */}

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
