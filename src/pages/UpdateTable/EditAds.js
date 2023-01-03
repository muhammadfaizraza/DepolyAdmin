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

  const { adsid } = state;  
  console.log(adsid,'adsid');

  const [image,setImage] = useState();
  const [preview,setPreview] = useState();

  const [state1, setState] = useState({
		TitleEn: '',
    TitleAr:'',
    DescriptionEn:'',
    DescriptionAr:'',
    image:image
	});

 
  console.log(preview,'pre')

  useEffect(() => {
		if (adsid) {
			setState({
				TitleEn: adsid.TitleEn,
        TitleAr: adsid.TitleAr,
				DescriptionEn: adsid.DescriptionEn,
        DescriptionAr: adsid.DescriptionAr,
			});
		} else {
		}
	}, [adsid]);

  useEffect(() => {
    if (image === undefined) {
      setPreview(adsid.image)
      return
  }  
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
}, [image])

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("TitleEn", state1.TitleEn);
      formData.append("TitleAr", state1.TitleAr);
      formData.append("DescriptionEn", state1.DescriptionEn);
      formData.append("DescriptionAr", state1.DescriptionAr);
      formData.append("image",image);
      const response = await axios.put(`${window.env.API_URL}/updateAds/${adsid._id}`, formData);
      history("/ads");
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
            <div className="Headers">Edit Advertisment</div>
            <div className="form">
              <form onSubmit={submit}>
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
                      <Form.Control type="text" placeholder="Details"  	value={state1.TitleEn}/>
                    </FloatingLabel>
                
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="عنوان"
                      style={{ direction: "rtl" }}

                      className="mb-3 floatingInputAr"
                      onChange={(e) =>
                        setState({ ...state1, TitleAr: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="Details"value={state1.TitleAr} />
                    </FloatingLabel>
                  
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Description"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, DescriptionEn: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Description"value={state1.DescriptionEn}/>
                    </FloatingLabel>
               
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="وصف"
                      style={{ direction: "rtl" }}

                      className="mb-3 floatingInputAr"
                      onChange={(e) =>
                        setState({ ...state1, DescriptionAr: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="Description"value={state1.DescriptionAr}/>
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
