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

  const { newsid } = state;
  console.log(newsid);
  const [image,setImage] = useState();
  const [preview,setPreview] = useState();

  const [state1, setState] = useState({
		TitleEn: '',
    TitleAr:'',
    DescriptionEn: '',
    DescriptionAr:'',
    SecondTitleEn: '',
    SecondTitleAr:'',
    image:image
	});
 

  useEffect(() => {
		if (newsid) {
			setState({
				TitleEn: newsid.TitleEn,
        TitleAr: newsid.TitleAr,
				DescriptionEn:newsid.DescriptionEn,
        DescriptionAr:newsid.DescriptionAr,
        SecondTitleEn: newsid.SecondTitleEn,
        SecondTitleAr: newsid.SecondTitleAr,
        image: newsid.image
   
			});
		} else {
			alert('No Data')
		}
	}, [newsid]);

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
  useEffect(() => {
    if (image === undefined) {
      setPreview(newsid.image)
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
      formData.append("TitleEn", state1.TitleEn);
      formData.append("TitleAr", state1.TitleAr);
      formData.append("DescriptionEn", state1.DescriptionEn);
      formData.append("DescriptionAr", state1.DescriptionAr);
      formData.append("SecondTitleEn", state1.SecondTitleEn);
      formData.append("SecondTitleAr", state1.SecondTitleAr);
      formData.append("image", image);

      const response = await axios.put(`${window.env.API_URL}/updatenews/${newsid._id}`, formData);
      history("/news");
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
            <div className="Headers">Edit News</div>
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
                      label="اسم"
                      
                      className="mb-3"
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
                      label="اسم"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, DescriptionAr: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="Description"value={state1.DescriptionAr}/>
                    </FloatingLabel>
                    
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Second Title "
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, SecondTitleEn: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Description"value={state1.SecondTitleEn}/>
                    </FloatingLabel>
               
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="اسم"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, SecondTitleAr: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="Description"value={state1.SecondTitleAr}/>
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
