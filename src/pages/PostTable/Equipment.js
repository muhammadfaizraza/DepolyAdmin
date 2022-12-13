import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate , useLocation} from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";

const Equipment = () => {
  //for error
  const [Error, setError] = useState("")
  const [ErrorAr, setErrorAr] = useState("")

  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");


  const history = useNavigate();
  const { pathname } = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("NameAr", NameAr + ' ');
      formData.append("NameEn", NameEn);
      // formData.append("shortCode",shortCode);

      await axios.post(`${window.env.API_URL}/uploadEquipment`, formData);
      if(pathname === '/equipment'){
        history("/equipmentlist");
      }
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
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
  const data1 = (JSON.stringify(
    TextInputValidation(
      "en",
      NameEn,
      "Equipment Name English"
    )
  ));

  const obj = JSON.parse(data1);
  const data2 = (JSON.stringify(
    TextInputValidation(
      "ar",
      NameAr,
      "Equipment Name Arabic"
    )
  ));
  const objAr = JSON.parse(data2);

  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Equipment</div>
          <div className="form">
            <Form onSubmit={submit}>
              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-3"
                    onChange={(e) => setNameEn(e.target.value)}
                    name="Name"
                    value={NameEn}
                    onBlur={() =>
                      setError(obj)

                    }
                  >
                    <Form.Control type="text" placeholder="Name" required/>
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                  <span className="error" 
                  >{Error.message}</span>
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
                    onBlur={() =>
                      setErrorAr(objAr)
                           
                     }
                  >
                    <Form.Control type="text" placeholder="اسم" required/>
                  </FloatingLabel>
                  <span className="errorAr" >{ErrorAr.message}</span>
                </div>
              </div>


              <div className="ButtonSection" style={{ justifyContent: "end" }}>
                <button type="submit" className="SubmitButton">
                  Add Equipment
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
