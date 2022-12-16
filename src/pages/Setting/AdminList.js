import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchAdminList ,STATUSES} from "../../redux/getReducer/getAdminList";
import { useNavigate } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import Moment from "react-moment";
import swal from 'sweetalert';
import axios from "axios";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";

const SubscriberList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { data: AdminList, status } = useSelector((state) => state.AdminList);

  useEffect(() => {
    dispatch(fetchAdminList());
  }, [dispatch]);

  const handleRole = async (Id) => {
    try {
      const res = await axios.put(`${window.env.API_URL}/adminChangeStatus/${Id}`);
      swal({
        title: "Success!",
        text: "Data has been Updated successfully ",
        icon: "success",
        button: "OK",
      });
      history("/AdminListing");
      dispatch(fetchAdminList());
    } catch (error) {
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }
    history("/AdminListing");
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
              <h4>Admin List</h4>
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
                        <th>Email</th>
                        <th>createdAt</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AdminList.map((item, index) => {
                        const { role } = item;
                        return (
                            <tr className="tr_table_class">
                            <td>{item.FirstName}</td>
                            <td>{item.LastName}</td>
                            <td>{item.Email}</td>
                            <td>
                              {" "}
                              <Moment format="YYYY/MM/DD">
                                {item.createdAt}
                              </Moment>
                            </td>
                            
                            <td style={{ textAlign: "center" }}>
                              <button className="Approvedbtn"  style={{
                                  backgroundColor: `${
                                    role === "approveduser"
                                      ? "#4547EE"
                                      : "#DE3E28"
                                  }`}} onClick={() => handleRole(item._id)}>{item.role === 'approveduser' ? <>Approved</> : <>Not Approved</>}</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </ScrollContainer>
              </div>
              <div className="ButtonSection">
                   
                  <button type="submit" className="SubmitButton" onClick={() => history(-1)}>
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
