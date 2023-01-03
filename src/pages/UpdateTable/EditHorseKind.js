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

  const { horsekindid } = state;
  console.log(horsekindid);

  const [state1, setState] = useState({
    NameEn: "",
    NameAr: "",
    AbbrevEn: "",
    AbbrevAr: "",
  });

  useEffect(() => {
    if (horsekindid) {
      setState({
        NameEn: horsekindid.NameEn,
        NameAr: horsekindid.NameAr,
        AbbrevEn: horsekindid.AbbrevEn,
        AbbrevAr: horsekindid.AbbrevAr,
      });
    } else {
      alert("No Data");
    }
  }, [horsekindid]);


  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr + ' ');
      formData.append("AbbrevEn", state1.AbbrevEn);
      formData.append("AbbrevAr", state1.AbbrevAr);

      const response = await axios.put(
        `${window.env.API_URL}/updateHorseKind/${horsekindid._id}`,
        formData
      );
      history("/horsekind");
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
            <div className="Headers">Edit Horse Kind</div>
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
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, NameAr: e.target.value })
                      }
                     
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.NameAr}/>
                    </FloatingLabel>
                    
                  </div>
                </div>
                <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Abbreviation"
                    className="mb-3"
                    onChange={(e) =>
                      setState({ ...state1, AbbrevEn: e.target.value })
                    }
         
                  >
                    <Form.Control type="text" placeholder="ShortCode" value={state1.AbbrevEn} />
                  </FloatingLabel>
                  <span className="spanForm"> |</span>
           
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label=" اختصار                    "
                    className="mb-3 floatingInputAr"
                    onChange={(e) =>
                      setState({ ...state1, AbbrevAr: e.target.value })
                    }
                 
                    style={{ direction: "rtl" }}
               
                  >
                    <Form.Control type="text" placeholder="التفاصيل" value={state1.AbbrevAr} />
                  </FloatingLabel>
    
                </div>
              </div>
                

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
