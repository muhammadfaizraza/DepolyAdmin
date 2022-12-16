import React from 'react'
import { useState } from 'react';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
  return (
    <div>
      <form>
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
