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

  const { courseid } = state;
  console.log(courseid)
  const [image,setImage] = useState();
  const [preview,setPreview] = useState();

  const [state1, setState] = useState({
		TrackNameEn: '',
    TrackNameAr:'',
    shortCode: '',
    image:image
    
	});

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image, image);
  };


  useEffect(() => {
		if (courseid) {
			setState({
				TrackNameEn: courseid.TrackNameEn,
        TrackNameAr: courseid.TrackNameAr,
        shortCode: courseid.shortCode,
				image:courseid.image
			});
		} else {
		}
	}, [courseid]);
  useEffect(() => {
    if (image === undefined) {
      setPreview(courseid.image)
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
      formData.append("TrackNameEn", state1.TrackNameEn);
      formData.append("TrackNameAr", state1.TrackNameAr + ' ');
      formData.append("shortCode", state1.shortCode);
      const response = await axios.put(`${window.env.API_URL}/updatecourse/${courseid._id}`, formData);
      history("/racecourse");
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
            <div className="Headers">Edit Race Course</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, TrackNameEn: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" value={state1.TrackNameEn}/>
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
                        setState({ ...state1, TrackNameAr: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" value={state1.TrackNameAr}/>
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
