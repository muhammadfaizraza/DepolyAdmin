import React, { useEffect, useState } from "react";
import { fetchAds, STATUSES } from "../../redux/getReducer/getAdsSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import AdsPopup from "../../Components/Popup/AdsPopup";
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import swal from "sweetalert";
import { BsEyeFill } from "react-icons/bs";
import Pagination from "./Pagination";
import Form from 'react-bootstrap/Form';

const Ads = () => {

  const [Value, setValue] = useState(false);
  //for Modal
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };
  const { data: allads, status } = useSelector((state) => state.ads);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allads.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const history = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAds());
  }, []);


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
          const res = await axios.delete(
            `${window.env.API_URL}/softdeleteAds/${Id}`
          );
          swal("Your data has been deleted Successfully!", {
            icon: "success",
         
          }
          )
          dispatch(fetchAds())
          
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
  console.log(Value,"hai bhai hai")

  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <>
              <div className="Header ">
                <h4>Advertisement Listings</h4>

                <div>
                  <h6
                    style={{
                      marginRight: "100px",
                      alignItems: "center",
                      color: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    
                  </h6>

                  <Link to="/adsform">
                    <button>Create Ad</button>
                  </Link>
                </div>
              </div>
              <div className="div_maintb">
                <ScrollContainer className="scroll-container">
                  <table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Title </th>
                        <th>Title Arabic</th>
                        <th>Description </th>
                        <th>Description Arabic</th>
                        <th>Image</th>
                        {/* <th>Active</th> */}
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
                              <td>{item.DescriptionEn}</td>
                              <td>{item.DescriptionAr}</td>
                              <td>
                                <img src={item.image} alt="" />
                              </td>
                                {/* <td>
                                <Form.Check 
                                  type="switch"
                                  id="custom-switch"
                                  onChange={() => setValue(true)}
                                  // label="Check this switch"
                                  value={Value}
                                />
                                </td> */}
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
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={allads.length}
            paginate={paginate}
            currentPosts={currentPosts}
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
          <h2 style={{ fontFamily: "inter" }}>Advertisement </h2>
        </Modal.Header>
        <Modal.Body>
          <AdsPopup data={modaldata} />
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
export default Ads;
