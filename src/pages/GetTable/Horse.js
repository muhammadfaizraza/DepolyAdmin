import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../redux/postReducer/PostHorse";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchHorse, STATUSES } from "../../redux/getReducer/getHorseSlice";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import ScrollContainer from "react-indiana-drag-scroll";
import swal from 'sweetalert';
import Moment from "react-moment";
import { Modal } from "react-bootstrap";
import HorsePopup from "../../Components/Popup/HorsePopup";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";

const Horse = () => {
 
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState()
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
      setmodaldata(data)
      await setShow(true)
  };
  const dispatch = useDispatch();
  const history = useNavigate();
  const { data: horse, status } = useSelector((state) => state.horse);
  const [pagenumber, setPageNumber] = useState(1);

  const previousPageHandler = () => {
    setPageNumber((pagenumber) => pagenumber - 1);
  };
  const nextPageHandler = () => {
    setPageNumber((pagenumber) => pagenumber + 1);
  };

  useEffect(() => {
    dispatch(fetchHorse({ pagenumber }));
  }, [dispatch]);
  


(horse);
  const handleRemove = (Id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal(" Your data  has been deleted!", {
          icon: "success",
        });
        dispatch(remove(Id));
      } else {
        swal("Your data is safe!");
      }
    });

   
    history("/horse");
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
              <h4>Horse Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

                <Link to="/horseform">
                  <button>Add Horse</button>
                </Link>
              </div>
            </div>
            <>
              <div className="div_maintb">
                <ScrollContainer className="scroll-container">
                  <table id="customers">
                    <thead>
              
                      <tr>
                        <th>Name</th>
                        <th>Name Ar</th>
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

                    {horse.map((item) => {
                      return (
                        <>
                          <tbody>
                            <tr>
                              <td>{item.NameEn}</td>
                              <td>{item.NameAr}</td>
                              <td> <Moment fromNow ago>
                                  {item.Age}
                                </Moment></td>
                             
                              <td>{item.SexModelData.NameEn}</td>
                            
                            <td>{item.ColorIDData.NameEn} </td>
                            {/* <td>{item.KindOfHorse === '' ? <>N/A</>: item.KindOfHorse}</td> */}
                            <td>{item.PurchasePrice}</td>
                            <td>
                                {item.BreederData === null ? (
                                  <>No Data</>
                                ) : (
                                  <>{item.BreederData.NameEn}</>
                                )}
                              </td>
                              <td>{item.Remarks}</td>
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
                                <img src={item.HorseImage} alt="" style={{
                                  width:'30px',height:'30px'
                                }}></img>
                              </td>
                              <td>
                                {/* <BiEdit /> */}
                                <MdDelete style={{
                                  fontSize: "22px",
                                }}/>
                         

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
     
        </div>
      </div>
      {/* <div
        style={{
          display: "flex",
          marginTop: "20px",
          justifyContent: "space-between",
        }}
      >
        <button
          className="button btn btn-primary"
          onClick={previousPageHandler}
          disabled={pagenumber === 1}
        >
          Previous
        </button>
        <p
          style={{
            marginTop: "20px",
          }}
        >
          Page {pagenumber}
        </p>
        <button
          className="button btn btn-primary"
          onClick={nextPageHandler}
          disabled={horse.length <= 1}
        >
          Next
        </button>
      </div> */}
        <Modal show={show} onHide={handleClose}   size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
                <Modal.Header closeButton>
                    <h2>Jockey </h2>
                </Modal.Header>
                <Modal.Body>
                <HorsePopup data={modaldata} />
                </Modal.Body>
                <Modal.Footer>

                <button onClick={handleClose}  className='modalClosebtn'>Close</button>
                </Modal.Footer>
            </Modal>
    </>
  );
};
export default Horse;