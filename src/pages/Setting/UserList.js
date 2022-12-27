import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchsubscriber ,STATUSES} from "../../redux/getReducer/getSubscriber";
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
// import { Country_Name, Country_NameAr } from "../../Components/Common/Country";


const statusData = [
  {
    id:1,
    data:'true',
    value:'Approved'
  },
  {
    id:0,
    data:'false',
    value:'Not Approved'
  }
]

const SubscriberList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { data: subscriber, status } = useSelector((state) => state.subscriber);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);


  const  [SearchData , setSearchData] = useState([]);
  const  [PassportNo , setPassportNo] = useState('');
  const  [Address , setAddress] = useState('');
  const  [PhoneNumber , setPhoneNumber] = useState('');
  const  [Approved , setApproved] = useState('');




  const GetSearch = async () => {
    const response = await axios.get((`${window.env.API_URL}/SearchUser?PassportNo=${PassportNo}&Address=${Address}&ApprovedStatus=${Approved}&PhoneNumber=${PhoneNumber}`))
    setSearchData(response.data.data)
  }
  useEffect(() => {
    dispatch(fetchsubscriber());
    GetSearch();
  }, [dispatch]);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = SearchData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [ShowCalender, setShowCalender] = useState(false)

 

  console.log(SearchData,'SearchData data1')
  const handleRole = async (Id) => {
    try {
      const res = await axios.put(`${window.env.API_URL}/ChangeStatus/${Id}`);
      swal({
        title: "Success!",
        text: "Data has been Updated successfully ",
        icon: "success",
        button: "OK",
      });
      history("/userlist");
      dispatch(fetchsubscriber());
    } catch (error) {
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }
    history("/userlist");
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
              <h4>User Management</h4>
              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <BiFilter className="calendericon" onClick={() => setShowCalender(!ShowCalender)}/>
                  <CSVLink data={subscriber} separator={";"} filename={"MKS User.csv"} className='csvclass'>
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
                
            <input type='text' class="form-control" onChange={(e) => setPassportNo(e.target.value)} placeholder="Enter Passport Number"/>
            <input type='text' class="form-control"  onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter Phone Number"/>
            <input type='text' class="form-control"  onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address"/>
            <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                name="country"
                                onChange={(e) => setApproved(e.target.value)}
                                required
                              >
                                {statusData.map((item) => {
                                  return (
                                    <option
                                      key={item.id}
                                      name="country"
                                      value={item.id}
                                    >
                                      {item.value}
                                    </option>
                                  );
                                })}
               </select>
                 </div>
                
                </div>
                <button className="filterbtn" onClick={GetSearch}>Apply Filter</button>
                </>:<></>
              }
              </div>
              
            <>
              <div className="div_maintb">
                <ScrollContainer className="scroll-container">
                  <table>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Passport No</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>createdAt</th>
                        <th>Passport Picture</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((item, index) => {
                      
                        return (
                            <tr className="tr_table_class">
                            <td>{item.FirstName}</td>
                            <td>{item.LastName}</td>
                            <td>{item.PassportNo}</td>
                            <td>{item.Email}</td>
                            <td>{item.PhoneNumber}</td>
                            <td>
                              {" "}
                              <Moment format="YYYY/MM/DD">
                                {item.createdAt}
                              </Moment>
                            </td>
                            <td>
                              <img src={item.PassportPicture} alt="" />
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <button className="Approvedbtn"  style={{
                                  backgroundColor: `${
                                    item.ApprovedStatus === true
                                      ? "#4547EE"
                                      : "#DE3E28"
                                  }`}} onClick={() => handleRole(item._id)}>{item.ApprovedStatus === true ? <>Approved</> : <>Not Approved</>}</button>
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
            totalPosts={SearchData.length}
            paginate={paginate}
          />
        </div>
        
      </div>
    </>
  );
};

export default SubscriberList;
