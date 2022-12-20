import React, { useState,useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../redux/postReducer/UserPost";
import { Form } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";


const AdminProfile = () => {
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, token } = useSelector((state) => state.user);
  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [shortCode, setshortCode] = useState("");

  useEffect(() => {
    if (userInfo === null) {
      dispatch(getUserDetails());
    }
  }, [userInfo, dispatch]);
  
  const [state1, setState] = useState({
		FirstName: '',
    LastName:'',
    role:'',
    Email: '',
	});

  useEffect(() => {
		if (userInfo) {
			setState({
				FirstName: userInfo.data.FirstName,
        LastName: userInfo.data.LastName,
				role: userInfo.data.role,
        Email: userInfo.data.Email,
			});
		} else {
		}
	}, [userInfo]);


  const submit = async (e) => {};

  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Admin Info</div>
          <div className="form">
            <form onSubmit={submit}>
            <div className="row mainrow">
            <div className="col-sm">
              <FloatingLabel
                controlId="floatingInput"
                label="First Name"
                className="mb-3"
                onChange={(e) =>
                  setState({ ...state1, FirstName: e.target.value })
                }
                name="Name"
               
              >
                <Form.Control
                  type="text"
                  value={state1.FirstName}
                  placeholder="Name"
                />
              </FloatingLabel>

              <span className="spanForm"> |</span>
            </div>

            <div className="col-sm">
              <FloatingLabel
                controlId="floatingInput"
                label="Last Name"
                className="mb-3"
                onChange={(e) =>
                  setState({ ...state1, LastName: e.target.value })
                }
              >
                <Form.Control type="text"  value={state1.LastName} />
              </FloatingLabel>
            </div>
          </div>

          <div className="row mainrow">
            <div className="col-sm">
              <FloatingLabel
                controlId="floatingInput"
                label="Role"
                className="mb-3"
                onChange={(e) =>
                  setState({ ...state1, role: e.target.value })
                }
                name="Name"
               
              >
                <Form.Control
                  type="text"
                  value={state1.role}
                  placeholder="Name"
                />
              </FloatingLabel>

              <span className="spanForm"> |</span>
            </div>
            <div className="col-sm">
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3"
                onChange={(e) =>
                  setState({ ...state1, Email: e.target.value })
                }
              >
                <Form.Control type="text"  value={state1.Email} />
              </FloatingLabel>
            </div>
          </div>
              <div className="ButtonSection">
                  <button type="submit" className="SubmitButton"
                  onClick={() => naviagate(-1)}>
                    Back
                  </button>
                  <button type="submit" className="SubmitButton">
                  Edit
                </button>
                </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
