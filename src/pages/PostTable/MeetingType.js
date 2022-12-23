import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import TextInputValidation from "../../utils/TextInputValidation";

const MeetingType = () => {
  //for errors
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");

  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [shortCode, setshortCode] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const history = useNavigate();
  const { pathname } = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();
      formData.append("NameEn", NameEn);
      formData.append("NameAr", NameAr + " ");
      // formData.append("shortCode",shortCode);

      await axios.post(`${window.env.API_URL}/uploadMeetingType`, formData);
      swal({
        title: "Success!",
        text: "Data has been added Successfully ",
        icon: "success",
        button: "OK",
      });
      if (pathname === "/meeting") {
        history("/getmeeting");
      }
      setisLoading(false)
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

  const data1 = JSON.stringify(
    TextInputValidation("en", NameEn, "Meeting Name")
  );

  console.log(data1, "asdasd");

  const obj = JSON.parse(data1);

  const data2 = JSON.stringify(
    TextInputValidation("ar", NameAr, "Meeting Name Arabic")
  );

  const objAr = JSON.parse(data2);

  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Meeting Type</div>
          <div className="form">
            <form onSubmit={submit}>
              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-3"
                    onChange={(e) => setNameEn(e.target.value)}
                    name="Name"
                    value={NameEn}
                    onBlur={() => setError(obj)}
                  >
                    <Form.Control type="text" placeholder="Name" required />
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                  <span className="error">{Error.message}</span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="اسم"
                    className="mb-3 floatingInputAr"
                    onChange={(e) => setNameAr(e.target.value)}
                    name="Name"
                    value={NameAr}
                    style={{ direction: "rtl" }}
                    onBlur={() => setErrorAr(objAr)}
                  >
                    <Form.Control type="text" placeholder="اسم" required />
                  </FloatingLabel>
                  <span className="errorAr">{ErrorAr.message}</span>
                </div>
              </div>
              <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Short Code"
                      className="mb-3"
                      // onChange={(e) =>
                      //   setregisteration({ ...registeration, shortCode: e.target.value })
                      // }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" />
                  </FloatingLabel>
                 
									
                  </div>
                </div>
              {/* <div className="row mainrow">
              <div className="col-sm">
          
                
                <FloatingLabel
        controlId="floatingInput"
        label="Short Code"
        className="mb-3"
        onChange={(e) => setshortCode(e.target.value)}
        value={shortCode}
                 
               
             
> 
        <Form.Control type="text" placeholder="Short Code"/>
      </FloatingLabel>
                
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
              <FloatingLabel
        controlId="floatingInput"
        label="رمز قصير"
        className="mb-3 floatingInputAr "
        style={{ direction: "rtl" , left:'initial' , right:0  }}

        
             
> 
        <Form.Control type="text" placeholder="رمز قصير"  style={{left:'%'}}   />
      </FloatingLabel>
              </div>
            </div> */}

              <div className="ButtonSection " style={{ justifyContent: "end" }}>
                <button Name="submit" className="SubmitButton" disabled={isLoading}>
                  Add Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingType;
