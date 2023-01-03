import React, { useEffect, Fragment, useState } from "react";
import { fetchdeletedslider, STATUSES } from "../../redux/getDeletedreducer/DeletedSliderSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import Pagination from "../../pages/GetTable/Pagination";
import { FaTrashRestoreAlt } from "react-icons/fa"
import { Modal } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import SliderPopup from "../Popup/SliderPopup";
import { MdDelete } from "react-icons/md";


const DeletedSlider = () => {
  const [Disable, setDisable] = useState(true);
  //for Modal
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  
  };

  
  const Restorefunction = (id) => {
    try {
      swal({
        title: "Are you sure?",
        text: "do you want to restore this data",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })

      .then( async(willDelete) => {

    await  axios.post(`${window.env.API_URL}/restoresoftdeleteslider/${id}`,);
     // api 
     //restoresoftdeletesponsor
     //restoresoftdeleteslider
     // button enable
   
     setDisable(true)
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
         
          }
          )
          dispatch(fetchdeletedslider())
          
        } else {
          swal("Your imaginary file is safe!");
        }
      });
      setDisable(false)
    }catch (error) {

      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }



  }

  
  const handleRemove = async (Id) => {
    try {
   await axios.delete(`${window.env.API_URL}/deleteSlider/${Id}`)
      swal({
        title: "Success!",
        text: "Data has been Deleted successfully ",
        icon: "success",
        button: "OK",
      });
      dispatch(fetchdeletedslider());
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

  const dispatch = useDispatch();

  const { data: deletedslider, status } = useSelector((state) => state.deletedslider);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = deletedslider.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  useEffect(() => {
    dispatch(fetchdeletedslider());
  }, [dispatch]);


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
              <h4>Slider Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >

                </h6>

                <Link to="/sliderform">
                  <button>Add Slider</button>
                </Link>
              </div>
            </div>
            <div className="div_maintb">
              <ScrollContainer className="scroll-container">
                <table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Title Arabic </th>
                      <th>Url</th>
                      <th>Image</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class">
                            <td>{item.TitleEn}</td>

                            <td>{item.TitleAr}</td>
                            <td>{item.Url}</td>
                            <td>
                              <img
                                src={item.image}
                                alt=""
                                style={{
                                  width: "30px",
                                  height: "30px",
                                }}
                              />
                            </td>

                            <td className="table_delete_btn1">
                              <FaTrashRestoreAlt onClick={() => Restorefunction(item._id)} disabled={!Disable} />
                              <BsEyeFill onClick={() => handleShow(item)} />
                              <MdDelete
                                  onClick={() => handleRemove(item._id)}
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


          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={deletedslider.length}
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
          <h2>Slider </h2>
        </Modal.Header>
        <Modal.Body>
          <SliderPopup data={modaldata} />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="modalClosebtn">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>)
}

export default DeletedSlider