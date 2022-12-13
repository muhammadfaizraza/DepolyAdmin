import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate ,useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";

const Horsekindform = () => {
  //FOR ERRORS
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const [ErrorShortName, setErrorShortName] = useState("");



  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [shortName, setshortName] = useState("");

  const history = useNavigate();
  const { pathname } = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("NameEn", NameEn);
      formData.append("NameAr", NameAr + ' ');
      formData.append("shortName",shortName);

      await axios.post(`${window.env.API_URL}/uploadHorseKind`, formData);
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });
      if(pathname === '/horsekindform'){
        history("/horsekind");
      }
    } catch (error) {
      const err = error.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }
  };


    
  const data1 = (JSON.stringify(
    TextInputValidation(
      "en",
      NameEn,
      "Horse Kind Name English"
    )
  ));

  const obj = JSON.parse(data1);
  const data2 = (JSON.stringify(
    TextInputValidation(
      "ar",
      NameAr,
      "Horse Kind Name Arabic"
    )
  ));
  const objAr = JSON.parse(data2);
  const data3 = (JSON.stringify(
    TextInputValidation(
      "en",
      shortName,
      "Horse Kind Short Name Arabic"
    )
  ));
  const shotName = JSON.parse(data3);

  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Horse Kind</div>
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
                    <Form.Control type="text" placeholder="Name" required/>
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
                    <Form.Control type="text" placeholder="اسم" required/>
                  </FloatingLabel>
                  <span className="errorAr">{ErrorAr.message}</span>
                </div>
              </div>

              <div className="row mainrow">
              <div className="col-sm">
             
                
                
                <FloatingLabel
        controlId="floatingInput"
        label="Short Name"
        className="mb-3"
        onChange={(e) => setshortName(e.target.value)}
        value={shortName}
        onBlur={() => setshortName(shotName)}
> 
        <Form.Control type="text" placeholder="ShortCode" />
      </FloatingLabel>
                <span className="spanForm"> |</span>
                <span className="error">{shortName.message}</span>
              </div>

              <div className="col-sm">
           
                        <FloatingLabel
        controlId="floatingInput"
        label="اسم قصير"
        className="mb-3 floatingInputAr"

                  style={{ direction: "rtl" }}
               
              
> 
        <Form.Control type="text" placeholder="التفاصيل"     />
      </FloatingLabel>
              </div>
            </div>

              <div className="ButtonSection " style={{ justifyContent: "end" }}>
                <button type="submit" className="SubmitButton">
                  Add Horse Kind
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Horsekindform;
