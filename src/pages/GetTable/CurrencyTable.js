import React, { useEffect ,Fragment,useState } from "react"
import { fetchcurrency ,STATUSES } from "../../redux/getReducer/getCurrency";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import CurrencyPopup from "../../Components/Popup/CurrencyPopup";
import Pagination from "./Pagination";



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

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8)
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = currency.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
      dispatch(fetchcurrency());
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
           await axios.delete(`${window.env.API_URL}/softdeleteCurrency/${Id}`)
            swal(" Your data has been deleted Successfully!", {
              icon: "success",
           
            }
            )
            dispatch(fetchcurrency())
            
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
                    {currentPosts.map((item, index) => {
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
          <Pagination
          postsPerPage={postsPerPage}
          totalPosts={currency.length}
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