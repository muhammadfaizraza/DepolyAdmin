import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
const NewsForm = () => {
  const history = useNavigate();
  const { state } = useLocation();

  const { groundtypeid } = state;
  console.log(groundtypeid ,'data');

  const [state1, setState] = useState({
    NameEn: "",
    NameAr: "",
    shortCode: "",
  });

  useEffect(() => {
    if (groundtypeid) {
      setState({
        NameEn: groundtypeid.NameEn,
        NameAr: groundtypeid.NameAr,
        shortCode: groundtypeid.shortCode,
      });
    } else {
      alert("No Data");
    }
  }, [groundtypeid]);

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr);
      // formData.append("shortCode", state1.shortCode);

      const response = await axios.put(
        `${window.env.API_URL}/updateGroundType/${groundtypeid._id}`,
        formData
      );
      history("/groundlist");
      swal({
        title: "Success!",
        text: "Data has been Updated successfully ",
        icon: "success",
        button: "OK",
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
  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Edit Ground Type</div>
            <div className="form">
            <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">

                  <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, NameEn: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.NameEn}/>
                    </FloatingLabel>
                 
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="اسم"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, NameAr: e.target.value })
                      }
                    >
                      <Form.Control  type="text" placeholder="Description" value={state1.NameAr}/>
                    </FloatingLabel>
                    
                  </div>
                </div>
                {/* <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Short Code"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, shortCode: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" value={state1.shortCode}/>
                    </FloatingLabel>
                 
									
                  </div>
                </div> */}
                

                <div className="ButtonSection" style={{ justifyContent: "end" }}>
                <button type="submit" className="SubmitButton">
                  Update
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsForm;
