import React, { useEffect, useState } from "react";
import { fetchNews, STATUSES } from "../../redux/getReducer/getNewsSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { remove } from "../../redux/postReducer/PostNewsSlice";
import swal from 'sweetalert';
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import ScrollContainer from "react-indiana-drag-scroll";
import NewsPopup from "../../Components/Popup/NewsPopup";
import {BsFillEyeFill} from 'react-icons/bs'
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";

const News = () => {

  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState()
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
      setmodaldata(data)
      await setShow(true)
  };
  const dispatch = useDispatch();
  const [pagenumber, setPageNumber] = useState(1);

  const previousPageHandler = () => {
    setPageNumber((pagenumber) => pagenumber - 1);
  };
  const nextPageHandler = () => {
    setPageNumber((pagenumber) => pagenumber + 1);
  };

  const history = useNavigate();
  const { data: allnews, status } = useSelector((state) => state.news);
  useEffect(() => {
    dispatch(fetchNews({ pagenumber }));
  }, []);
  const handleRemove = (Id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          dispatch(remove(Id));
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    dispatch(remove(Id));
    history("/news");
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

                        <th>Description </th>
                        <th>Title Arabic</th>
                        <th>Sub Title Arabic</th>
                        <th>Description Arabic</th>
                        <th>Image</th>

                        <th>Action</th>
                    
                      </tr>
                    </thead>
                    <tbody>
                      {allnews.map((item, index) => {
                        return (
                          <tr className="tr_table_class" key={index}>
                            <td>{item.TitleEn}</td>

                            <td>{item.SecondTitleEn}</td>

                            <td>{item.DescriptionEn}</td>

                            <td>{item.TitleAr}</td>
                            <td>{item.DescriptionAr}</td>
                            <td>{item.SecondTitleAr}</td>
                            <td>
                            <img
                              src={item.image}
                              alt=""
                             
                            />
                            </td> 
                            <td style={{paddingRight:"200px"}}>
                          
                              <MdDelete
                               
                                onClick={() => handleRemove(item.id)}
                              />
                        
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
        </div>
      </div>
      <Modal show={show} onHide={handleClose}   size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
                <Modal.Header closeButton>
                    <h2>News </h2>
                </Modal.Header>
                <Modal.Body>
                <NewsPopup data={modaldata} />
                </Modal.Body>
                <Modal.Footer>

                <button onClick={handleClose}  className='modalClosebtn'>Close</button>
                </Modal.Footer>
            </Modal>

    </>
  );
};
export default News;
