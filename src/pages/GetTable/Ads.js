import React, { useEffect,useState } from "react";
import { fetchAds, STATUSES } from "../../redux/getReducer/getAdsSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { remove } from "../../redux/postReducer/PostAds";
import { Link } from 'react-router-dom'
import { edit } from "../../redux/postReducer/PostAds";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import AdsPopup from "../../Components/Popup/AdsPopup";
import ScrollContainer from 'react-indiana-drag-scroll';
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import {BiEdit} from 'react-icons/bi'

const Ads = () => {

  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState()
  const handleClose = () => setShow(false);

  const history = useNavigate()
  const dispatch = useDispatch();
  const { data: allads, status } = useSelector((state) => state.ads);
  useEffect(() => {
    dispatch(fetchAds());
  }, []);
  const handleRemove = (Id) => {
    dispatch(remove(Id));
  };
  let handleEdit = (Id) => {

    dispatch(edit(Id));
    history('/adsforms')
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

  


(allads,'allads')
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
                      <th >Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allads.map((item, index) => {
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

                            <td className="table_delete_btn1" onClick={() => history('/editjockey',{
                                state:{
                                  jockeyid:item._id
                                }
                              })}>
                                  {/* <BiEdit /> */}
                                <MdDelete
                                style={{
                                  fontSize: "22px",
                                }}
                                  // onClick={() => handleRemove(item._id)}
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
            </>
          </div>

        </div>
      </div>
      <Modal show={show} onHide={handleClose}   size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
                <Modal.Header closeButton>
                    <h2>Ads </h2>
                </Modal.Header>
                <Modal.Body>
                <AdsPopup data={modaldata} />
                </Modal.Body>
                <Modal.Footer>

                <button onClick={handleClose}  className='modalClosebtn'>Close</button>
                </Modal.Footer>
            </Modal> 
    </>
  );
};
export default Ads;
