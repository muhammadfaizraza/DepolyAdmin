import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Modal } from "react-bootstrap";
import SliderPopup from "../../Components/Popup/SliderPopup";
import swal from "sweetalert";
import remove from "../../redux/postReducer/PostSlider";
import { fetchSlider, STATUSES } from "../../redux/getReducer/getSliderSlice";
import "../../Components/CSS/Table.css";
import { BsFillEyeFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";


const Slider = () => {
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);

  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };
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
        swal("Your imaginary file is safe!");
      }
    });

    fetchSlider();
  };

  const dispatch = useDispatch();
  const [pagenumber, setPageNumber] = useState(1);

  const previousPageHandler = () => {
    setPageNumber((pagenumber) => pagenumber - 1);
  };
  const nextPageHandler = () => {
    setPageNumber((pagenumber) => pagenumber + 1);
  };
  const { data: slider, status } = useSelector((state) => state.slider);
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchSlider({ pagenumber }));
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
            <>
              <div className="div_maintb">
                {" "}
                <table>
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
                    {slider.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class">
                            <td>{item.TitleEn}</td>

                            <td>{item.TitleAr}</td>
                            <td>{item.Url}</td>
                            <td>
                              <img src={item.image} alt="" />
                            </td>

                            <td>
                              {/* <BiEdit
                                onClick={() =>
                                  history("/editslider", {
                                    state: {
                                      sliderid: item._id,
                                    },
                                  })
                                }
                              /> */}
                              <MdDelete
                                // onClick={() => handleRemove(item._id)}
                              />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
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
    </>
  );
};

export default Slider;
