import React, { useEffect,useState } from "react";
import { fetchSponsor, STATUSES } from "../../redux/getReducer/getSponsorSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { remove } from "../../redux/postReducer/PostSponsor";
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi'
import ScrollContainer from "react-indiana-drag-scroll";
import SponserPopup from '../../Components/Popup/SponserPopup';
import { Modal } from "react-bootstrap";
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
  const { data: sponsor, status } = useSelector((state) => state.sponsor);
  useEffect(() => {
    dispatch(fetchSponsor());
  }, []);
  const handleRemove = async (Id) => {
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

    fetchSponsor();
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
              <h4>Sponsor Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

                <Link to="/sponsorform">
                  <button>Add Sponsor</button>
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
                      <th style={{textAlign: 'center'}}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sponsor.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class">


                            <td>{item.TitleEn}</td>
                            <td>{item.TitleAr}</td>
                            <td>{item.DescriptionEn}</td>
                            <td>{item.DescriptionAr}</td>

                            <td>
                              <img src={item.image} alt="" style={{
                                width: '30px', height: '30px'
                              }} />
                            </td>
                            <td className="table_delete_btn1" style={{textAlign: 'center'}}>
                            {/* <Link to ={`/editsponsor/${item._Id}`}      ><BiEdit /></Link>  */}
                          
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

        </div>
      </div>
      <Modal show={show} onHide={handleClose}   size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
                <Modal.Header closeButton>
                    <h2>Sponsor </h2>
                </Modal.Header>
                <Modal.Body>
                <SponserPopup data={modaldata} />
                </Modal.Body>
                <Modal.Footer>

                <button onClick={handleClose}  className='modalClosebtn'>Close</button>
                </Modal.Footer>
            </Modal>
    </>
  );
};
export default News;
