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
import Form from "react-bootstrap/Form";
import { BiFilter } from "react-icons/bi";
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { DateRangePicker } from 'react-date-range';

const Ads = () => {
  const [Value, setValue] = useState(false);
  const [ShowCalender, setShowCalender] = useState(false);
  const [SearchUrl, setSearchUrl] = useState('');
  const [SearchCode, setSearchCode] = useState('');
  const [SearchTitle, setSearchTitle] = useState('');
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
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

  const GetSearch = async () => {
    dispatch(fetchAds({SearchTitle,SearchCode,SearchUrl}));
    setSearchTitle('')
    setSearchCode('')
    setSearchUrl('')
  };


  useEffect(() => {
    dispatch(fetchAds({SearchTitle,SearchCode,SearchUrl}));
  }, []);

  const handleRemove = async (Id) => {
    try {
      swal({
        title: "Are you sure?",
        text: "do you want to delete this data ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const res = await axios.delete(
            `${window.env.API_URL}/softdeleteAds/${Id}`
          );
          swal("Your data has been deleted Successfully!", {
            icon: "success",
          });
          dispatch(fetchAds({SearchTitle,SearchCode,SearchUrl}));
        } else {
          swal("Your data is safe!");
        }
      });
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
            <>
              <div className="Header ">
                <h4>Advertisement Listings</h4>

                <div>
           

                  <Link to="/adsform">
                    <button>Create Ad</button>
                  </Link>
                  <OverlayTrigger
                    overlay={<Tooltip id={`tooltip-top`}>Filter</Tooltip>}
                  >
                    <span className="addmore">
                      <BiFilter
                        className="calendericon"
                        onClick={() => setShowCalender(!ShowCalender)}
                      />
                    </span>
                  </OverlayTrigger>
                  <CSVLink
                    data={allads}
                    separator={";"}
                    filename={"MKS Ads.csv"}
                    className="csvclass"
                  >
                    Export CSV
                  </CSVLink>
                </div>
              </div>
              <div>
                {ShowCalender ? (
                  <span className="transitionclass">
                    <div className="userfilter">
                      <div className="filtertextform forflex">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Title"
                          onChange={(e) => setSearchTitle(e.target.value)}

                        />
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Description"
                          onChange={(e) => setSearchCode(e.target.value)}

                        />
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter URL"
                          onChange={(e) => setSearchUrl(e.target.value)}

                        />
                      </div>
                      
                    </div>
                    <button className="filterbtn" onClick={GetSearch}>
                   Apply Filter
                 </button>
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div className="div_maintb">
                <ScrollContainer className="scroll-container">
                  <table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Title </th>
                        <th>Title Arabic</th>
                        <th>Description </th>
                        <th>Description Arabic</th>
                        <th>Url</th>
                        <th>Image</th>

                        <th>Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((item, index) => {
                        return (
                          <>
                            <tr className="tr_table_class">
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
                              <td>{item.TitleEn}</td>
                              <td>{item.TitleAr}</td>
                              <td>{item.DescriptionEn}</td>
                              <td>{item.DescriptionAr}</td>
                              <td>{item.url}</td>

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
