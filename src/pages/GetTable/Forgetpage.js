import React from 'react'
import { useState } from 'react';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const history = useNavigate();

    const submit = async (event) => {
        event.preventDefault();
        try {
          const formData = new FormData();
          formData.append("Email", email);
         const res = await axios.post(`${window.env.API_URL}/adminpassword/forgot`, formData);
         const msg = res.data.message
          swal({
            title: "Success!",
            text: msg,
            icon: "success",
            button: "OK",
          });
          history("/");
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
    <div>
      <form onSubmit={submit}>
      <div className="col-sm EmailForget">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email"
                      className="mb-3"
                      name="Email"
                    >
                      <Form.Control
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="Email"
                        type="email"
                        placeholder="Enter Email"
                        
                      />
                    </FloatingLabel>
                 
                  </div>
                  <button type="submit" className="SubmitButton EmailForgetBtn">
                    Submit
                  </button>
      </form>
    </div>
  )
}

export default ForgetPassword
