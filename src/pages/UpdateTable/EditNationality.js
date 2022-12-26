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

  const { nationalityid } = state;
  console.log(nationalityid)
  const [image,setImage] = useState();
  const [preview,setPreview] = useState();

  const [state1, setState] = useState({
		NameEn: '',
    NameAr:'',
    shortCode: '',
		AltNameEn: '',
    AltNameAr: '',
    AbbrevAr: '',
    AbbrevEn: '',
    Offset:'',
    ValueEn:'',
    ValueAr:'',
    image:image
    
	});

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image, image);
  };


  useEffect(() => {
		if (nationalityid) {
			setState({
				NameEn: nationalityid.NameEn,
        NameAr: nationalityid.NameAr,
        shortCode: nationalityid.shortCode,
        AltNameEn: nationalityid.AltNameEn,
        AltNameAr: nationalityid.AltNameAr,
        AbbrevAr: nationalityid.AbbrevAr,
        AbbrevEn: nationalityid.AbbrevEn,
        Offset:nationalityid.Offset,
        ValueEn:nationalityid.ValueEn,
        ValueAr:nationalityid.ValueAr,
				image:nationalityid.image
			});
		} else {
		}
	}, [nationalityid]);
  useEffect(() => {
    if (image === undefined) {
      setPreview(nationalityid.image)
      return
  }  
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
}, [image])

  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("image", image);
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr);
      formData.append("shortCode", state1.shortCode);
      formData.append("AltNameEn", state1.AltNameEn);
      formData.append("AltNameAr", state1.AltNameAr);

      formData.append("AbbrevAr", state1.AbbrevAr);
      formData.append("AbbrevEn", state1.AbbrevEn);
      // formData.append("Label", state1.Label);
      formData.append("Offset", state1.Offset);
      formData.append("ValueEn", state1.ValueEn);
      formData.append("ValueAr", state1.ValueAr);

      const response = await axios.put(`${window.env.API_URL}/updateNationality/${nationalityid._id}`, formData);
      history("/nationalitylist");
      swal({
        title: "Success!",
        text: "Data has been Updated Successfully ",
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
            <div className="Headers">Edit Nationality</div>
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
                      <Form.Control type="text"  placeholder="Description" value={state1.NameEn}/>
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
                      <Form.Control type="text"  placeholder="Description" value={state1.NameAr}/>
                    </FloatingLabel>
                 
                  </div>
                </div>
                
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Short Code"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, shortCode: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number"  placeholder="Description" value={state1.shortCode}/>
                    </FloatingLabel>
                  
                  </div>

                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Alternate Name"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, AltNameEn: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" value={state1.AltNameEn}/>
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
                        setState({ ...state1, AltNameAr: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" value={state1.AltNameAr}/>
                    </FloatingLabel>
                 
                  </div>

                </div>

                 <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Abbrevation"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, AbbrevEn: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" value={state1.AbbrevEn}/>
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
                        setState({ ...state1, AbbrevAr: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" value={state1.AbbrevAr}/>
                    </FloatingLabel>
                 
                  </div>

                </div> 

                {/* <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Label"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, Label: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" value={state1.Label}/>
                    </FloatingLabel>
                  
                  </div>

               
                </div> */}

                {/* <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Offset"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, Offset: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number"  placeholder="Description" value={state1.Offset}/>
                    </FloatingLabel>
                  
                  </div>

                </div> */}

                {/* <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="ValueEn"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, ValueEn: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" value={state1.ValueEn}/>
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
                      <Form.Control type="text"  placeholder="Description" value={state1.NameAr}/>
                    </FloatingLabel>
                 
                  </div>

                </div> */}

                <div className="ButtonSection">
                <div>
                <input type='file' onChange={fileSelected} className="formInput"/>
                <img src={preview}  className="PreviewImage" alt=""/>

                </div>
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
