import React, { Fragment, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";

const Color = () => {
  //for errors
  const [Error , setError] =useState("")
  const [ErrorAr , setErrorAr] =useState("")
  
  const [registeration, setregisteration] = useState({
    NameEn: "",
    NameAr: "",
  });
  const [records, setrecords] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setregisteration({ ...registeration, [name]: value });
  };


  const data1 =  (JSON.stringify(
    TextInputValidation(
      "en",
      registeration.NameEn,
      "Color Name"
    )
  ));

  console.log(data1,'asdasd')

  const obj = JSON.parse(data1);
  console.log(obj.status,'aszxZ2dasd')
 const data2 =  (JSON.stringify(
    TextInputValidation(
      "ar",
      registeration.NameAr,
      "Color Name Arabic"
    )
  ));


  const objAr = JSON.parse(data2);

  const submit = async (event) => {

    event.preventDefault();
    
    // alert(
    //   JSON.stringify(TextInputValidation("en", registeration.NameEn, "Title English"))
    // );
    try {
      const formData = new FormData();
      formData.append("NameEn", registeration.NameEn);
      formData.append("NameAr", registeration.NameAr + " ");
      await axios.post(`${window.env.API_URL}/uploadColor`, formData);
      swal({
        title: "Success!",
        text: "Data has been added Successfully ",
        icon: "success",
        button: "OK",
      });
      if (pathname === "/color") {
        history("/colorlist");
      }
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
  //conditional styling for errors
  const styles = {
    popup:{
      color: Error.status === true ? "green" : "red",
 
    }
  };
  const stylesAr = {
    popupAr:{
      color: ErrorAr.status === true ? "green" : "red",
 
    }
  };

  const history = useNavigate();
  const { pathname } = useLocation();

  return (
    <Fragment>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Create Color</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      className="mb-3"
                      name="Name"
                    >
                      <Form.Control
                        required
                        onChange={handleChange}
                        value={registeration.NameEn}
                        name="NameEn"
                        type="text"
                        placeholder="Name"
                        onBlur={() =>
                         setError(obj)
                              
                        }
                      />
                    </FloatingLabel>
                 
                    <span className="spanForm"> |</span>
                    <span className="error" style={styles.popup}
                    >{Error.message}</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="اسم"
                      className="mb-3 floatingInputAr"
                      name="Name"
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control
                        name="NameAr"
                        onChange={handleChange}
                        value={registeration.NameAr}
                        type="text"
                        placeholder="اسم"
                        required
                        onBlur={() =>
                          setErrorAr(objAr)
                               
                         }
                     
                      />
                    </FloatingLabel>
                    <span className="errorAr" style={stylesAr.popupAr} >{ErrorAr.message}</span>
                  </div>
                </div>
                

                <div
                  className="ButtonSection "
                  style={{ justifyContent: "end" }}
                >
                  <button Name="submit" className="SubmitButton">
                    Add Color
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Color;
