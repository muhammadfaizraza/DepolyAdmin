import React, { useEffect ,Fragment,useState } from "react"
import { fetchcurrency ,STATUSES } from "../../redux/getReducer/getCurrency";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { remove } from "../../redux/postReducer/PostJockey";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import CurrencyPopup from "../../Components/Popup/CurrencyPopup";



const CurrencyTable = () => {
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
    setmodaldata(data);
    await setShow(true);
  };

    const dispatch = useDispatch();
    const history = useNavigate();
    const { data: currency, status } = useSelector((state) => state.currency);
    useEffect(() => {
      dispatch(fetchcurrency());
    }, [dispatch]);

    const handleRemove = async (Id) => {
      try {
        const res = await axios.delete(`${window.env.API_URL}/softdeleteCurrency/${Id}`)
        swal({
          title: "Success!",
          text: "Data has been Deleted successfully ",
          icon: "success",
          button: "OK",
        });
        dispatch(fetchcurrency());
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
<Fragment>

<div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Header ">
              <h4>Currency Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

                <Link to="/currency">
                  <button>Add Currency</button>
                </Link>
              </div>
            </div>
            <>
              <div className="div_maintb">
                <ScrollContainer >
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Name Arabic </th>
                    
                      <th>Short Code</th>
                    <th>Rate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currency.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class">
                            <td>{item.NameEn}</td>
                            <td>{item.NameAr}</td>

<td>{item.shortCode} </td>
<td>{item.Rate} </td>


                      

                          
                            <td className="table_delete_btn1">
                             <BiEdit onClick={() => history('/editcurrency',{
                                state:{
                                  currencyid:item
                                }
                              })} />
                              <MdDelete
                                style={{
                                  fontSize: "22px",
                                }}
                                onClick={() => handleRemove(item._id)}
                              />
                                 <BsEyeFill onClick={() => handleShow(item)}/>
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
          <h2 style={{fontFamily: "inter"}}>Currency</h2>
        </Modal.Header>
        <Modal.Body>
          <CurrencyPopup data={modaldata} />
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

export default CurrencyTable