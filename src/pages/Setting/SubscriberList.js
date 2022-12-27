import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchnewsletter ,STATUSES} from "../../redux/getReducer/getNewLetter";
import { useNavigate } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import Moment from "react-moment";
import swal from 'sweetalert';
import axios from "axios";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import Pagination from "../GetTable/Pagination";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { BiFilter } from 'react-icons/bi';
import { CSVLink } from "react-csv";
import { BiBlock } from "react-icons/bi";


const SubscriberList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { data: newsletter, status } = useSelector((state) => state.newsletter);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = newsletter.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [ShowCalender, setShowCalender] = useState(false)

  useEffect(() => {
    dispatch(fetchnewsletter());
  }, [dispatch]);

  const handleRole = async (Id) => {
    try {
      const res = await axios.put(`${window.env.API_URL}/ChangeStatus/${Id}`);
      swal({
        title: "Success!",
        text: "Data has been Updated successfully ",
        icon: "success",
        button: "OK",
      });
      history("/subscriberlist");
      dispatch(fetchnewsletter());
    } catch (error) {
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }
    history("/subscriberlist");
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
  // const handleRole = async (Id) => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "You want to Approve User!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //     .then((willDelete) => {
  //       if (willDelete) {
  //         swal("Poof! User has been Approved!", {
  //           icon: "success",
  //         });
  //          axios.put(`${window.env.API_URL}/ChangeStatus/${Id}`);
  //       } else {
  //         swal("Not Approved");
  //       }
  //     });
  // };
 

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
              <h4>Subscriber Management</h4>
              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <BiFilter className="calendericon" onClick={() => setShowCalender(!ShowCalender)}/>
                  <CSVLink data={newsletter} separator={";"} filename={"MKS Subscriber.csv"} className='csvclass'>
                        Export CSV
                    </CSVLink>
                </h6>

                
              </div>
            </div>
            
              <div>
              
              {
                ShowCalender ?
                <>
                <div className="userfilter">
                <div className="calenderuser">
                <DateRangePicker
                 onChange={item => setState([item.selection])}
                 showSelectionPreview={true}
                 moveRangeOnFirstSelection={false}
                 months={2}
                 ranges={state}
                 direction="horizontal"
               />
                </div>
                <div className="filtertextform">
                
            <input type='text' class="form-control" placeholder="Enter Email"/>
                 </div>
                
                </div>
                <button className="filterbtn">Apply Filter</button>
                </>:<></>
              }
              </div>
              
            <>
              <div className="div_maintb">
                <ScrollContainer className="scroll-container">
                  <table>
                    <thead>
                      <tr>
                        <th>No #</th>
                        <th>Email</th>
                        <th>createdAt</th>   
                       <th style={{ textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((item, index) => {
                        return (
                            <tr className="tr_table_class">
                            <td>{index + 1}</td>
                            <td>{item.Email}</td>
                            <td>
                              {" "}
                              <Moment format="YYYY/MM/DD">
                                {item.createdAt}
                              </Moment>
                            </td>
                            
                            <td style={{ textAlign: "center" }}>
                               
                                <BiBlock />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </ScrollContainer>
              </div>
              {/* <div className="ButtonSection">
                   
                  <button type="submit" className="SubmitButton" onClick={() => history(-1)}>
                    Back
                  </button>
              </div> */}
            </>
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={newsletter.length}
            paginate={paginate}
          />
        </div>
        
      </div>
    </>
  );
};

export default SubscriberList;
