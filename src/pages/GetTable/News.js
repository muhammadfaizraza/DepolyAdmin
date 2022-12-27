import React, { useEffect, useState } from "react";
import { fetchNews, STATUSES } from "../../redux/getReducer/getNewsSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import ScrollContainer from "react-indiana-drag-scroll";
import NewsPopup from "../../Components/Popup/NewsPopup";
import { BsFillEyeFill } from "react-icons/bs";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import Pagination from "./Pagination";
import {Form} from "react-bootstrap"

const News = () => {

  const [Value , setValue] = useState(false)
  //For Modal
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };
  const dispatch = useDispatch();

  const history = useNavigate();
  const { data: allnews, status } = useSelector((state) => state.news);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allnews.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  useEffect(() => {
    dispatch(fetchNews());
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
        await axios.delete(`${window.env.API_URL}/softdeletenews/${Id}`)
          swal("Your data has been deleted Successfully!", {
            icon: "success",
         
          }
          )
          dispatch(fetchNews())
          
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
              <h4>News Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >

                </h6>

                <Link to="/newsform">
                  <button>Add News</button>
                </Link>
              </div>
            </div>
            <>
              <div className="div_maintb">
                <ScrollContainer className="scroll-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Title </th>
                        <th>Sub Title </th>
                        <th>Title Arabic</th>
                        <th>Sub Title Arabic</th>
                        <th>Description </th>
                        <th>Description Arabic</th>
                        <th>Image</th>
<th>Active</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((item, index) => {
                        return (
                          <tr className="tr_table_class" key={index}>
                            <td>{item.TitleEn}</td>
                            <td>{item.TitleAr}</td>

                            <td>{item.SecondTitleEn}</td>
                            <td>{item.SecondTitleAr}</td>

                            <td>{item.DescriptionEn}</td>
                            <td>{item.DescriptionAr}</td>
                            
                            <td>
                              <img src={item.image} alt="" />
                            </td>
                            <td>
                                <Form.Check 
                                  type="switch"
                                  id="custom-switch"
                                  onChange={() => setValue(true)}
                                  // label="Check this switch"
                                  value={Value}
                                />
                                </td>
                            <td className="table_delete_btn1"
                              style={{ textAlign: "center" }}>
                            <BiEdit
                                onClick={() =>
                                  history("/editnews", {
                                    state: {
                                      newsid: item
                                    },
                                  })
                                }
                              />
                              <MdDelete
                                onClick={() => handleRemove(item._id)}
                              />
                              <BsFillEyeFill onClick={() => handleShow(item)}/>
                            </td>
                          </tr>
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
          totalPosts={allnews.length}
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
          <h2>News </h2>
        </Modal.Header>
        <Modal.Body>
          <NewsPopup data={modaldata} />
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
export default News;
