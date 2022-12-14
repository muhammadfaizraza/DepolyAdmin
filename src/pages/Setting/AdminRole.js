import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";


const AdminRole = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PassportNo, setPassportNo] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [Email, setEmail] = useState("");

  const history = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("FirstName", FirstName);
      formData.append("LastName", LastName);
      formData.append("PassportNo", FirstName);
      formData.append("PhoneNumber", PhoneNumber);
      formData.append("password", password);
      formData.append("Email", Email);
      await axios.post(`${window.env.API_URL}/adminregister`, formData);
      swal({
        title: "Success!",
        text: "Data has been added Successfully ",
        icon: "success",
        button: "OK",
      });
      history("/AddRole");
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
  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Role</div>
          <div className="form">
          <form onSubmit={submit}>
              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="First Name"
                    className="mb-3"
                    onChange={(e) => setFirstName(e.target.value)}
                    name="Name"
                    value={FirstName}
                  >
                    <Form.Control type="text" placeholder="Name" required/>
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                  
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Last Name"
                    className="mb-3"
                    onChange={(e) => setLastName(e.target.value)}
                    name="Name"
                    value={LastName}
                  
                  >
                    <Form.Control type="text" placeholder="اسم" required/>
                  </FloatingLabel>
                </div>
              </div>

              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Passport No"
                    className="mb-3"
                    onChange={(e) => setPassportNo(e.target.value)}
                    name="Name"
                    value={PassportNo}
                  >
                    <Form.Control type="text" placeholder="Name" required/>
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                  
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Phone Number"
                    className="mb-3"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    name="Name"
                    value={PhoneNumber}
                  
                  >
                    <Form.Control type="text" placeholder="اسم" required/>
                  </FloatingLabel>
                </div>
              </div>

              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Password"
                    className="mb-3"
                    onChange={(e) => setpassword(e.target.value)}
                    name="Name"
                    value={password}
                  >
                    <Form.Control type="text" placeholder="Name" required/>
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                  
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email"
                    className="mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                    name="Name"
                    value={Email}
                  
                  >
                    <Form.Control type="text" placeholder="اسم" required/>
                  </FloatingLabel>
                </div>
              </div>


              <div className="ButtonSection " style={{ justifyContent: "end" }}>
                <button Name="submit" className="SubmitButton">
                  Add Role
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRole;
