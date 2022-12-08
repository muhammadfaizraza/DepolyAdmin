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

  const { seoid } = state;
  console.log(seoid);


  const [state1, setState] = useState({
		KeywordEn: '',
    KeywordAr:'',
    TitleEn: '',
    TitleAr:'',
	});


  useEffect(() => {
		if (seoid) {
			setState({
				KeywordEn: seoid.KeywordEn,
        KeywordAr: seoid.KeywordAr,
				TitleEn: seoid.TitleEn,
        TitleAr: seoid.TitleAr,
			});
		} else {
		}
	}, [seoid]);

  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("KeywordEn", state1.KeywordEn);
      formData.append("KeywordAr", state1.KeywordAr + ' ');
      formData.append("TitleEn", state1.TitleEn);
      formData.append("TitleAr", state1.TitleAr + ' ');

      const response = await axios.put(`${window.env.API_URL}/updateSeoKeyword/${seoid._id}`, formData);
      history("/Seolisting");
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
            <div className="Headers">Edit SEO</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Keyword"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, KeywordEn: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.KeywordEn}/>
                    </FloatingLabel>
                  
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="الكلمة الرئيسية  "
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, KeywordAr: e.target.value })
                      }
                      
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.KeywordAr}/>
                    </FloatingLabel>
                    
                  </div>
                </div> 

                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Title"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, TitleEn: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.TitleEn}/>
                    </FloatingLabel>
                  
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="عنوان"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, TitleAr: e.target.value })
                      }
                     

                    >
                      <Form.Control type="text" placeholder="Description" value={state1.TitleAr}/>
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
