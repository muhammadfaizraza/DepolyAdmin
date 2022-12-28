import React, { useEffect, Fragment,useState } from "react";
import { fetchcolor, STATUSES } from "../../redux/getReducer/getColor";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { remove } from "../../redux/postReducer/PostJockey";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import ColorPopup from "../../Components/Popup/ColorPopup";
import {BsEyeFill} from "react-icons/bs"
import Pagination from "./Pagination";
import { BiFilter } from 'react-icons/bi';
import { CSVLink } from "react-csv";


const NewsLetter = () => {
  const [ShowCalender, setShowCalender] = useState(false)

    const dispatch = useDispatch();
    const history = useNavigate();
    const { data: Color, status } = useSelector((state) => state.color);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8)
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = Color.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
    useEffect(() => {
      dispatch(fetchcolor());
    }, [dispatch]);
    const handleRemove = async (Id) => {
      try {
        const res = await axios.delete(`${window.env.API_URL}/softdeleteColor/${Id}`);
        swal({
          title: "Success!",
          text: "Data has been Deleted successfully ",
          icon: "success",
          button: "OK",
        });
        history("/colorlist");
        dispatch(fetchcolor());
      } catch (error) {
        const err = error.response.data.message;
        swal({
          title: "Error!",
          text: err,
          icon: "error",
          button: "OK",
        });
      }
      history("/colorlist");
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
    <Fragment>
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Header ">
            <h4>Color Listings</h4>

            <div>
              <h6
                style={{
                  marginRight: "100px",
                  alignItems: "center",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                
              </h6>

              <Link to="/color">
                <button>Add Color</button>
              </Link>
            </div>
          </div>
          <div>
              
              {
                ShowCalender ?
                <span className="transitionclass">
                <div className="userfilter">
                
                <div className="filtertextform forflex">
                
                 <input type='text' class="form-control" placeholder="Enter Title"/>
                 <input type='text' class="form-control" placeholder="Enter Description"/>
                 </div>
                
                </div>
                <button className="filterbtn">Apply Filter</button>
                </span>:<></>
              }
              </div>
          <>
            <div className="div_maintb">
              <ScrollContainer>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Name Arabic </th>

                      <th>Short Code</th>

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

                            <td className="table_delete_btn1">
                              <BiEdit
                                onClick={() =>
                                  history("/editcolor", {
                                    state: {
                                      colorid: item,
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
        totalPosts={Color.length}
        paginate={paginate}
        currentPage={currentPage}

      />
      </div>
    </div>
 
  </Fragment>
  )
}

export default NewsLetter