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

  const { sponsorid } = state;  
  console.log(sponsorid,'sponsorid');
  const [preview,setPreview] = useState();

  const [image,setImage] = useState();
  const [state1, setState] = useState({
		TitleEn: '',
    TitleAr:'',
    DescriptionEn:'',
    DescriptionAr:'',
		Url: '',
    image:image
	});

 

  useEffect(() => {
		if (sponsorid) {
			setState({
				TitleEn: sponsorid.TitleEn,
        TitleAr: sponsorid.TitleAr,
				DescriptionEn: sponsorid.DescriptionEn,
        DescriptionAr: sponsorid.DescriptionAr,
				Url: sponsorid.Url,
			});
		} else {
		}
	}, [sponsorid]);

  useEffect(() => {
    if (image === undefined) {
      setPreview(sponsorid.image)
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
      formData.append("Url", state1.Url);
      formData.append("image",image);
      const response = await axios.put(`${window.env.API_URL}/updateSponsor/${sponsorid._id}`, formData);
      history("/sponsor");
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
            <div className="Headers">Edit Sponsor</div>
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
                      <Form.Control type="text" placeholder="Description" value={state1.TitleEn}/>
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
                        setState({ ...state1, TitleAr: e.target.value })
                      }
                     
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.TitleAr}/>
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
                      <Form.Control type="text" placeholder="Description" value={state1.DescriptionEn}/>
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
                      <Form.Control type="text" placeholder="Description" value={state1.DescriptionAr}/>
                    </FloatingLabel>
                    
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="URL"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, Url: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.Url}/>
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
              {/* <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                  <input
										type='text'
										name='TitleEn'
										id='TitleEn'
										className='group__control'
										placeholder='Name'
										value={state1.TitleEn}
										onChange={(e) =>
											setState({ ...state1, TitleEn: e.target.value })
										}
									/>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="اسم "
                      type='text'
										name='TitleAr'
										id='TitleAr'
										className='group__control'
										value={state1.TitleAr}
										onChange={(e) =>
											setState({ ...state1, TitleAr: e.target.value })
										}
                    ></input>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                  <input
										type='text'
										name='TitleEn'
										id='TitleEn'
										className='group__control'
										placeholder='Description'
										value={state1.DescriptionEn}
										onChange={(e) =>
											setState({ ...state1, DescriptionEn: e.target.value })
										}
									/>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="اسم "
                      type='text'
										name='TitleAr'
										id='TitleAr'
										className='group__control'
										value={state1.DescriptionAr}
										onChange={(e) =>
											setState({ ...state1, DescriptionAr: e.target.value })
										}
                    ></input>
                  </div>
                </div>
                

                <div className="ButtonSection">
                  <input type="file" size="60" onChange={fileSelected} />
                  <button type="submit" className="SubmitButton">
                  Update
                  </button>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsForm;
