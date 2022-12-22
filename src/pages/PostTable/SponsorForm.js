import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import axios from "axios";

import { useNavigate ,useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";
import { ImCross } from 'react-icons/im';
import swal from "sweetalert";

const SponsorForm = () => {
     //for error
 const [Error, setError] = useState("");
 const [ErrorAr, setErrorAr] = useState("");
 const [descError, setdescError] = useState("");
 const [descErrorAr, setdescErrorAr] = useState("");
 const [ErrorURL ,setErrorURL] = useState("");

  
  const history = useNavigate();

  const {pathname} = useLocation();

  const [Url, setUrl] = useState();
  const [TitleEn, setTitleEn] = useState("");
  const [TitleAr, setTitleAr] = useState("");
  const [DescriptionAr, setDescriptionAr] = useState("");
  const [DescriptionEn, setDescriptionEn] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("TitleEn", TitleEn);
      formData.append("TitleAr", TitleAr + ' ');
      formData.append("DescriptionAr", DescriptionAr + ' ');
      formData.append("DescriptionEn", DescriptionEn);
      formData.append("Url", Url);

     
      await axios.post(
        `${window.env.API_URL}uploadSponsor?keyword=&page=`,
        formData
      );
      swal({
        title: "Success!",
        text: "Data has been added successfully",
        icon: "success",
        button: "OK",
      });
      if(pathname === '/sponsorform'){
        history("/sponsor");      }
    
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

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onSelectFile = (e) => {
    setImage(e.target.files[0])(image, "image");
  };

  const handlePreview = () => {
    setImage()
  document.getElementById("file").value=""
  };

    const data1 = (JSON.stringify(
      TextInputValidation(
        "en",
        TitleEn,
        "Sponsor Title English"
      )
    ));
  
    const obj = JSON.parse(data1);
    const data2 = (JSON.stringify(
      TextInputValidation(
        "ar",
        TitleAr,
        "Sponsor Title Arabic"
      )
    ));
    const objAr = JSON.parse(data2);
    const data3 = (JSON.stringify(
      TextInputValidation(
        "en",
        DescriptionEn,
        "Sponsor Description English"
      )
    ));
  
    const description = JSON.parse(data3);
    const data4 = (JSON.stringify(
      TextInputValidation(
        "ar",
        DescriptionAr,
        "Sponsor Description Arabic"
      )
    ));
    const descriptionAr = JSON.parse(data4);


    return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Add Sponsor</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Title"
                      className="mb-3"
                      onChange={(e) => setTitleEn(e.target.value)}
                      name="Name"
                      value={TitleEn}
                      onBlur={() =>
                        setError(obj)
  
                      }
                    >
                      <Form.Control type="text" placeholder="Title" required />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                    <span className="error" 
                  >{Error.message}</span>
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
                      onBlur={() =>
                        setErrorAr(objAr)
                             
                       }
                    >
                      <Form.Control type="text" placeholder="عنوان" required/>
                    </FloatingLabel>
                    <span className="errorAr" >{ErrorAr.message}</span>
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
                      onBlur={() => setdescError(description)}
                    >
                      <Form.Control type="text" placeholder="Description" required />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                    <span className="error">{descError.message}</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="التفاصيل"
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setDescriptionAr(e.target.value)}
                      value={DescriptionAr}
                      style={{ direction: "rtl" }}
                      onBlur={() => setdescErrorAr(descriptionAr)}
                      
                    >
                      <Form.Control type="text" placeholder="التفاصيل" required />
                    </FloatingLabel>
                    <span className="errorAr">{descErrorAr.message}</span>
                  </div>
                </div>


                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Sponsor URL"
                      className="mb-3"
                      onChange={(e) => setUrl(e.target.value)}
                      name="Name"
                      value={Url}
                      onBlur={() => Url === " " ? setErrorURL("URL is required"):setErrorURL("")}
                    >
                      <Form.Control type="text" placeholder="Title" required/>
                    </FloatingLabel>
                    <span className="error">{ErrorURL}</span>

                  </div>

                
                </div>

                <div className="ButtonSection">
                  <div>
                  <label className="Multipleownerlabel">
                      Select Sponsor image
                    </label>
                    <input
                      type="file"
                      onChange={onSelectFile}
                      className="formInput"
                      id="file"
                    />
                    {image && (
                      <>
                       <ImCross onClick={handlePreview} className="crossIcon"/>
                       <img src={preview} className="PreviewImage" alt="" />
                      </>
                    )}
                  </div>

                  <button type="submit" className="SubmitButton">
                    Add Sponsor
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

export default SponsorForm;
