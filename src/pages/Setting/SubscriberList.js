import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchsubscriber ,STATUSES} from "../../redux/getReducer/getSubscriber";
import { useNavigate } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import Moment from "react-moment";
import swal from 'sweetalert';
import axios from "axios";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";

const SubscriberList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: subscriber, status } = useSelector((state) => state.subscriber);

  useEffect(() => {
    dispatch(fetchsubscriber());
  }, [dispatch]);

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
  const handleRole = async (Id) => {
    swal({
      title: "Are you sure?",
      text: "You want to Approve User!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! User has been Approved!", {
            icon: "success",
          });
           axios.put(`http://3.90.189.40:4000/api/v1/ChangeStatus/${Id}`);
        } else {
          swal("Not Approved");
        }
      });
  };
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
              <h4>Subscriber List</h4>
              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

                
              </div>
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
                      {subscriber.map((item, index) => {
                        const { role } = item;
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
                                    role === "approveduser"
                                      ? "#4547EE"
                                      : "#DE3E28"
                                  }`}} onClick={() => handleRole(item._id)}>{item.role}</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </ScrollContainer>
              </div>
              <div className="ButtonSection">
                   
                  <button type="submit" className="SubmitButton" onClick={() => navigate(-1)}>
                    Back
                  </button>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriberList;
