import React, { useEffect,useState } from "react";
import { fetchTrainer, STATUSES } from "../../redux/getReducer/getTrainerSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { remove } from "../../redux/postReducer/PostTrainer";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import TrainerPopup from "../../Components/Popup/TrainerPopup";
import {BsFillEyeFill} from 'react-icons/bs';
import ScrollContainer from "react-indiana-drag-scroll";
import Moment from 'react-moment';
import swal from 'sweetalert';
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";


const Trainer = () => {

  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState()
  const handleClose = () => setShow(false);
  const handleShow = async (data) => {
      setmodaldata(data)
      await setShow(true)
  };

  const dispatch = useDispatch();

  const { data: trainer, status } = useSelector((state) => state.trainer);
  const handleRemove = (Id) => {
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
  };
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 8;


  useEffect(() => {
    dispatch(fetchTrainer({limit}));
      setpageCount(Math.ceil(trainer / limit));
      setItems(trainer);
  }, []);
  
    const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    // const commentsFormServer = await fetchComments(currentPage);

    setItems(trainer);
    
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
  const dob = new Date().toLocaleString()
  const age =' 2022-11-14T00:00:00.000Z'

  return (
   <>

   <div className="page">
  
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}

        >    <div className='Header '>

        <h4>Trainer Listings</h4>
        
        
        
        
        
        
        
        <div>
          <h6 style={{ marginRight: "100px", alignItems: "center", color: "rgba(0, 0, 0, 0.6)" }}></h6>
        
          <Link to="/trainerform">
            <button>Add Trainer</button>
          </Link>
        </div>
        
        </div>

          <>
          <div className="div_maintb">
          <ScrollContainer className="scroll-container">
            <table >
              <thead>
                <tr>              
                <th>Name</th>
                <th>Name Arabic</th>
                <th>Age</th>
                <th>Title</th>
                <th>Title Arabic</th>
                {/* <th>Date Of Birth</th> */}
                <th>Licence Date</th>
                <th>Short Name</th>
                <th>Short Name Arabic </th>
                {/* <th>Rating</th> */}
            
               
                  <th>Remarks</th>
                  <th>Detail</th>
                                   <th>Image</th>
               
              
                  
                  <th>Action</th>
           
                </tr>
              </thead>
              <tbody>
                {trainer.map((item, index) => {
                  return (
                    <>
                      <tr className="tr_table_class">
        
                    
                        <td>{item.NameEn}</td>
                        <td>{item.NameAr}</td>
                        <td> <Moment fromNow ago>{item.DOB}</Moment></td>
                        <td>{item.TitleEn}</td>
                        <td>{item.TitleAr ===  '' ? <>N/A</>:item.TitleAr}</td>
                       
                       {/* <td>{item.DOB} </td> */}
                       <td> <Moment format="YYYY/MM/DD">{item.TrainerLicenseDate}</Moment></td>  
                       <td>{item.ShortNameEn}</td>
                       <td>{item.ShortNameAr ===  '' ? <>N/A</>:item.ShortNameAr} </td>
                       
                       {/* <td>{item.Rating}</td> */}
                       <td style={{maxWidth: '400px',  overflow: 'hidden',textOverflow: "ellipsis", whiteSpace: "nowrap"    }}  >{item.Remarks}</td>
                        <td style={{maxWidth: '400px',  overflow: 'hidden',textOverflow: "ellipsis", whiteSpace: "nowrap"    }}>{item.Detail}</td>
                        <td>
                          <img src={item.image} alt="" />
                        </td>                        
                        <td className="table_delete_btn1 ">
                          <MdDelete
                            style={{
                              fontSize: "22px",
                            }}
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
          </>
        </div>
       
      </div>
    </div>
    <Modal show={show} onHide={handleClose}   size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
                <Modal.Header closeButton>
                    <h2>Jockey </h2>
                </Modal.Header>
                <Modal.Body>
                <TrainerPopup data={modaldata} />
                </Modal.Body>
                <Modal.Footer>

                <button onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
   </>
  );
};
export default Trainer;
