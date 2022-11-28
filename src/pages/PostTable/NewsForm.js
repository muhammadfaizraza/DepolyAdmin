import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import axios from "axios";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../../redux/postReducer/PostNewsSlice";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import swal from "sweetalert";

const NewsForm = () => {
  // const dispatch = useDispatch();
  const history = useNavigate();
  const [TitleEn, setTitleEn] = useState("");
  const [TitleAr, setTitleAr] = useState("");
  const [SecondTitleEn, setSecondTitleEn] = useState("");
  const [SecondTitleAr, setSecondTitleAr] = useState("");
  const [DescriptionAr, setDescriptionAr] = useState("");
  const [DescriptionEn, setDescriptionEn] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("TitleEn", TitleEn);
      formData.append("TitleAr", TitleAr);
      formData.append("SecondTitleEn", SecondTitleEn);
      formData.append("SecondTitleAr", SecondTitleAr);
      formData.append("DescriptionAr", DescriptionAr);
      formData.append("DescriptionEn", DescriptionEn);
      const response = await axios.post(
        `${window.env.API_URL}/uploadnews?keyword=&page=`,
        formData
      );
      swal({
        title: "success!",
        text: "Data Submitted !",
        icon: "success",
        button: "OK",
      });
      history("/news");
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
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);


    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
  };
  const isSubmitData =
    TitleAr === "" ||
    TitleEn === "" ||
    SecondTitleEn === "" ||
    SecondTitleAr === "" ||
    DescriptionAr === "" ||
    DescriptionEn === "" ||
    image === null ||
    image === undefined;

  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Add News</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row  mainrow">
                  <div className="col-sm">
               



<FloatingLabel
        controlId="floatingInput"
        label="Title"
        className="mb-3"
        onChange={(e) => setTitleEn(e.target.value)}
     
        value={TitleEn}
> 
        <Form.Control type="text" placeholder="Title" />
      </FloatingLabel>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  

<FloatingLabel
        controlId="floatingInput"
        label="عنوان"
        className="mb-3 floatingInputAr"
onChange={(e) => setTitleAr(e.target.value)}
                  name="Name"
                  value={TitleAr}
                  style={{ direction: "rtl" }}
               
             
> 
        <Form.Control type="text" placeholder="عنوان"     />
      </FloatingLabel>

                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                   
                    <FloatingLabel
        controlId="floatingInput"
        label="Sub-Title"
        className="mb-3"
        onChange={(e) => setSecondTitleEn(e.target.value)}
     
        value={SecondTitleEn}
> 
        <Form.Control type="text" placeholder="Sub-Title" />
      </FloatingLabel>


                    
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                 

<FloatingLabel
        controlId="floatingInput"
        label="عنوان"
        className="mb-3 floatingInputAr"
onChange={(e) => setSecondTitleAr(e.target.value)}
                  name="Name"
                  value={SecondTitleAr}
                  style={{ direction: "rtl" }}
               
             
> 
        <Form.Control type="text" placeholder="عنوان"     />
      </FloatingLabel>

                  </div>
                </div>
           
                <div className="row mainrow">
                  <div className="col-sm">
                  
       
                    
                    
       <FloatingLabel
        controlId="floatingInput"
        label="Description"
        className="mb-3"
        onChange={(e) => setDescriptionEn(e.target.value)}
        value={DescriptionEn}
> 
        <Form.Control type="text" placeholder="Description" />
      </FloatingLabel>
                    
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
             


<FloatingLabel
        controlId="floatingInput"
        label="التفاصيل"
        className="mb-3 floatingInputAr"
        onChange={(e) => setDescriptionAr(e.target.value)}
                      value={DescriptionAr}  
                      style={{ direction: "rtl" }}
             
> 
        <Form.Control type="text" placeholder="التفاصيل"     />
      </FloatingLabel>
                  </div>
                </div>

                <div className="ButtonSection">
                  <div>
                    <input
                      type="file"
                      onChange={onSelectFile}
                      className="formInput"
                    />
                    {image && (
                      <img src={preview} alt="" className="PreviewImage" />
                    )}
                  </div>

                  <button type="submit" className="SubmitButton">
                    Add News
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
