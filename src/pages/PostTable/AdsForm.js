import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";
import swal from "sweetalert";
import { ImCross } from 'react-icons/im';



const AdsForm = () => {

//for error
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const [ErrorDesc, setErrorDesc] = useState("");
  const [ErrorDescAr, setErrorDescAr] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const history = useNavigate();
  const [TitleEn, setTitleEn] = useState("");
  const [TitleAr, setTitleAr] = useState("");
  const [DescriptionAr, setDescriptionAr] = useState("");
  const [DescriptionEn, setDescriptionEn] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
     try {
    const formData = new FormData();
     formData.append("image", image);
     formData.append("TitleEn", TitleEn);
     formData.append("TitleAr", TitleAr);
     formData.append("DescriptionEn", DescriptionEn);
     formData.append("DescriptionAr", DescriptionAr);
     const res = await axios.post(`${window.env.API_URL}/uploadAds`, formData);
     swal({
       title: "Success!",
       text: "Data has been added Successfully",
       icon: "success",
       button: "OK",
     });

     history("/ads");
     setisLoading(false)
     } catch (error) {
      const err = error.response.data.message;
       swal({
         title: "Error!",
         text: err,
         icon: "error",
         button: "OK",
       });
       setisLoading(false)

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

  const handlePreview = () => {
    setImage()
  document.getElementById("file").value=""
  };

  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
  };
  
  const data1 = (JSON.stringify(
    TextInputValidation(
      "en",
      TitleEn,
      "Ads Title English"
    )
  ));

  const obj = JSON.parse(data1);
  const data2 = (JSON.stringify(
    TextInputValidation(
      "ar",
      TitleAr,
      "Ads Title Arabic"
    )
  ));
  const objAr = JSON.parse(data2);
  const data3 = (JSON.stringify(
    TextInputValidation(
      "en",
      DescriptionEn,
      "Ads Description English"
    )
  ));

  const description = JSON.parse(data3);
  const data4 = (JSON.stringify(
    TextInputValidation(
      "ar",
      DescriptionAr,
      "Ads Description Arabic"
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
            <div className="Headers">Create Advertisement</div>
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
                      onBlur={() => setError(obj)}
                    >
                      <Form.Control type="text" placeholder="Title" />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                    <span className={Error.status ? 'success' : 'error'} >{Error.message}</span>
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
                      onBlur={() => setErrorAr(objAr)}
                    >
                      <Form.Control type="text" placeholder="عنوان" />
                    </FloatingLabel>
                    <span className={ErrorAr.status ? 'successAr' : 'errorAr'}>{ErrorAr.message}</span>
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
                      onBlur={() => setErrorDesc(description)}
                    >
                      <Form.Control type="text" placeholder="Description" />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                    <span className={ErrorDesc.status ? 'success' : 'error'}>{ErrorDesc.message}</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="التفاصيل"
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setDescriptionAr(e.target.value)}
                      value={DescriptionAr}
                      style={{ direction: "rtl" }}
                      onBlur={() => setErrorDescAr(descriptionAr)}
                    >
                      <Form.Control type="text" placeholder="التفاصيل" />
                    </FloatingLabel>
                    <span className={ErrorDescAr.status ? 'successAr' : 'errorAr'}>{ErrorDescAr.message}</span>
                  </div>
                </div>

                <div className="ButtonSection">
                  <div>
                    <label className="Multipleownerlabel">
                      Select Ads image
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

                  <button type="submit" className="SubmitButton" disabled={isLoading}>
                    Create Ads
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

export default AdsForm;
